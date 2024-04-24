<script>
	import { username } from '$lib/stores.js';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { crossfade } from 'svelte/transition';

	import { DeskStates, JournalTypes, JournalStates } from '$lib/enums.js';
	import { currentJournal } from '$lib/stores.js';
	import Journal from './Journals/Journal.svelte';
	import { scale } from 'svelte/transition';

	// Initialize
	let journalDatas = [];
	let entryDatas = [];
	const [send, receive] = crossfade({});

	let viewingShelf = [];
	let namingShelf = [];
	let stylingShelf = [];
	let editingShelf = [];

	let deskState = DeskStates.Viewing;

	$: switch (deskState) {
		case DeskStates.Viewing:
			console.log('Viewing');
			viewingShelf = journalDatas;
			namingShelf = [];
			stylingShelf = [];
			editingShelf = [];
			break;
		case DeskStates.Styling:
			console.log('Styling');
			viewingShelf = [];
			namingShelf = [];
			stylingShelf = Object.values(JournalTypes).map((type) => type.value);
			editingShelf = [];
			break;
		case DeskStates.Naming:
			console.log('Naming');
			viewingShelf = [];
			namingShelf = [1, 2, 3];
			stylingShelf = [];
			editingShelf = [];
			break;
		case DeskStates.Editing:
			console.log('Editing');
			viewingShelf = [];
			namingShelf = [];
			stylingShelf = [];
			editingShelf = [journalDatas[0]];
			break;
		default:
			break;
	}

	function toggleDesk() {
		// Switch to next desk state
		switch (deskState) {
			case DeskStates.Viewing:
				deskState = DeskStates.Editing;
				break;
			case DeskStates.Styling:
				deskState = DeskStates.Naming;
				break;
			case DeskStates.Naming:
				deskState = DeskStates.Editing;
				break;
			case DeskStates.Editing:
				deskState = DeskStates.Viewing;
				break;
			default:
				deskState = DeskStates.Viewing;
				break;
		}
	}

	onMount(() => {
		subscribeToJournals();
		subscribeToEntries();
		getJournalData();
		getEntryData();
	});

	// Methods

	function subscribeToJournals() {
		const subscription = supabase
			.channel('journal_channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'journals'
				},
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							console.log('new', payload.new);
							journalDatas = [...journalDatas, payload.new];
							break;
						case 'DELETE':
							console.log('old', payload.old);
							journalDatas = journalDatas.filter(
								(journalData) => journalData.id !== payload.old.id
							);
							break;
						case 'UPDATE':
							console.log('old', payload.old);
							journalDatas = [...journalDatas];
							break;
					}
				}
			)
			.subscribe();
	}

	function subscribeToEntries() {
		const subscription = supabase
			.channel('entries_channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'entries'
				},
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							console.log('new', payload.new);
							entryDatas = [...entryDatas, payload.new];
							break;
						case 'DELETE':
							console.log('old', payload.old);
							entryDatas = entryDatas.filter((entryData) => entryData.id !== payload.old.id);
							break;
						case 'UPDATE':
							console.log('old', payload.old);
							entryDatas = [...entryDatas];
							break;
					}
				}
			)
			.subscribe();
	}

	/* 
	----- Get Data functions -----
*/

	async function getJournalData() {
		// Get Journals
		const { data, error } = await supabase.from('journals').select('*').eq('username', $username);
		if (error) {
			console.error('Error fetching journals', error);
			return {
				status: 500,
				error: 'Could not fetch journals'
			};
		} else {
			console.log(data);
		}
		journalDatas = data ?? [];
	}

	async function getEntryData() {
		// Get entries based on what journals we have
		const { data, error } = await supabase
			.from('entries')
			.select('*')
			.in('journal', journalDatas)
			.order('date', { ascending: false })
			.order('created_at', { ascending: false });
		if (error) {
			console.error('Error fetching Entries', error);
			return {
				status: 500,
				error: 'Could not fetch entries'
			};
		} else {
		}
		entryDatas = data ?? [];
	}

	function logOut() {
		localStorage.removeItem('username');
		$username = '';
	}

	/* 
		---------- Journal CRUD ----------
	*/

	async function saveJournal(event) {
		console.log('Saving Journal in Journal.svelte');

		const journalToSave = event.detail;
		console.log(journalToSave);

		const saveData = { ...journalToSave, username: $username };

		const { data, error } = await supabase.from('journals').insert([saveData]).select();
		if (error) {
			console.log('ERROR SAVING');
		} else {
			console.log('Successfully saved new Journal!', data);
		}

		deskState = DeskStates.Viewing;
	}

	async function deleteJournal(event) {
		console.log('deleting this journal');

		const journalToDelete = event.detail;
		console.log(journalToDelete);

		const { data, error } = await supabase.from('journals').delete().eq('id', journalToDelete.id);
		if (error) {
			console.log('ERROR DELETING');
		} else {
			console.log('Successfully deleted new Journal!', data);
		}
	}

	function selectJournal(event) {
		const selectedData = event.detail;
		console.log(selectedData);

		switch (deskState) {
			case DeskStates.Viewing:
				if (selectedData.type === 'new') {
					$currentJournal = { title: '', type: null };
					deskState = DeskStates.Styling;
				} else {
					$currentJournal = selectedData;
					deskState = DeskStates.Editing;
				}
				break;
			case DeskStates.Styling:
				deskState = DeskStates.Naming;
				$currentJournal = {
					title: '',
					type: selectedData.type
				};
				break;
			case DeskStates.Naming:
				break;
			case DeskStates.Editing:
				break;
		}
	}

	function goBack() {
		deskState = DeskStates.Viewing;
	}

	function swap(item) {
		if (viewingShelf.includes(item)) {
			viewingShelf = viewingShelf.filter((i) => i !== item);
			editingShelf = [...editingShelf, item];
		} else {
			editingShelf = editingShelf.filter((i) => i !== item);
			viewingShelf = [...viewingShelf, item];
		}
	}
</script>

<div class="frame">
	<!-- Banner -->
	<div class="banner" style="background: url('Wood Texture.png');">
		<div class="left">
			{#if deskState !== DeskStates.Viewing}
				<button on:click={goBack} class="material-symbols-outlined"> arrow_back </button>
			{/if}
		</div>
		<div class="middle">
			<div class="name">{$username}'s desk</div>
		</div>
		<div class="right">
			{#if $username}
				<button on:click={logOut} class="material-symbols-outlined"> logout </button>
			{/if}
		</div>
	</div>
	<!-- <input class="search" type="search" placeholder="search" /> -->
	<button on:click={toggleDesk}>CLICK ME</button>
	<!-- Journals (Dynamic) -->
	<main>
		<!-- VIEWING -->
		<div class="shelf viewing">
			{#each viewingShelf as journalData (journalData.id)}
				<div
					class="journal-wrapper"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData.id }}
					out:send={{ key: journalData.id, duration: 200 }}
				>
					<Journal
						{journalData}
						journalState={JournalStates.Viewing}
						entryDatas={entryDatas.filter((entry) => entry.journal === journalData.id)}
					/>
				</div>
			{/each}
		</div>

		<div class="shelf styling">
			{#each stylingShelf as journalData (journalData)}
				<div
					class="journal-wrapper"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData.id }}
					out:send={{ key: journalData.id, duration: 0 }}
				>
					<Journal {journalData} journalState={JournalStates.Styling} />
				</div>
			{/each}
		</div>
		<div class="shelf editing">
			{#each namingShelf as journalData (journalData)}
				<div
					class="journal-wrapper"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData.id }}
					out:send={{ key: journalData.id, duration: 0 }}
				>
					<Journal {journalData} journalState={JournalStates.Naming} />
				</div>
			{/each}
		</div>
		<div class="shelf editing">
			{#each editingShelf as journalData (journalData.id)}
				<div
					class="journal-wrapper"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData.id, duration: 200}}
					out:send={{ key: journalData.id, duration: 0 }}
				>
					<Journal
						{journalData}
						journalState={JournalStates.Editing}
						entryDatas={entryDatas.filter((entry) => entry.journal === $currentJournal.id)}
					/>
				</div>
			{/each}
		</div>
	</main>

	<!-- <div class="journal-container">
		{#if deskState === DeskStates.Viewing}
			{#each journalDatas as journalData (journalData)}
				<div
					class="animate"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData }}
					out:send={{ key: journalData }}
				>
					<Journal
						{journalData}
						journalState={JournalStates.Viewing}
						entryDatas={entryDatas.filter((entry) => entry.journal === journalData.id)}
						on:selectJournal={selectJournal}
						on:deleteJournal={deleteJournal}
					/>
				</div>
			{/each}

			<Journal
				journalData={{ type: 'new' }}
				journalState={JournalStates.Viewing}
				{entryDatas}
				on:selectJournal={selectJournal}
			/>
		{:else if deskState === DeskStates.Styling}
			{#each Object.values(JournalTypes) as journalData}
				<Journal
					journalData={{ type: journalData.value, title: journalData.value }}
					journalState={JournalStates.Styling}
					{entryDatas}
					on:selectJournal={selectJournal}
				/>
			{/each}
		{:else if deskState === DeskStates.Naming}
			<Journal
				journalData={$currentJournal}
				journalState={JournalStates.Naming}
				{entryDatas}
				on:saveJournal={saveJournal}
			/>
		{:else if deskState === DeskStates.Editing}
			{#each journalDatas.filter((journal) => journal.id === $currentJournal.id) as journalData (journalData)}
				<div
					class="animate"
					animate:flip={{ duration: 200 }}
					in:receive={{ key: journalData }}
					out:send={{ key: journalData }}
				>
					<Journal
						{journalData}
						journalState={JournalStates.Editing}
						entryDatas={entryDatas.filter((entry) => entry.journal === $currentJournal.id)}
					/>
				</div>
			{/each}
		{/if}
	</div> -->
</div>

<style>
	.frame {
		/* position: relative; */
		min-height: 100vh;
		max-width: 100vw;
		display: flex;
		flex-direction: column;
		background-color: lavender;
		border: solid 2px yellow;
	}

	.journal-wrapper {
		/* padding: 1rem;
		margin: 0.5rem; */
		/* background-color: aqua; */
		border: solid purple 1px;
		/* background-image: url('Composition Texture.png'); */
	}

	.banner {
		/* position: fixed; */
		/* width: 100%; */
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		justify-content: center;
		align-items: center;
		/* gap: 1rem; */
		padding: 2rem;
		/* background-color: red; */
	}
	.banner .left {
		display: flex;
		justify-content: start;
		/* border: solid blue 1px; */
	}
	.banner .right {
		display: flex;
		justify-content: end;
		/* border: solid green 1px; */
	}
	.banner .middle {
		/* border: solid yellow 1px; */
	}

	.search {
		width: 20rem;
		margin: 1rem auto;
	}

	.name {
		color: white;
		font-size: 2rem;
	}

	.shelf {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 3rem;
		/* border: solid green 2px; */

		/* transition: all 1s ease-out; */
		/* background-color: green; */
	}

	.viewing {
		/* background-color: red; */
	}

	.editing {
		/* background-color: blue; */
	}
</style>
