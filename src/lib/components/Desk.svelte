<script>
	import { username } from '$lib/stores.js';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	import { DeskStates, JournalTypes, JournalStates } from '$lib/enums.js';
	import { currentJournal } from '$lib/stores.js';
	import Journal from './Journals/Journal.svelte';

	// Initialize
	let journalDatas = [];
	let entryDatas = [];

	let deskState = DeskStates.Viewing;

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
							entryDatas = entryDatas.filter(
								(entryData) => entryData.id !== payload.old.id
							);
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
		}
		journalDatas = data ?? [];
	}

	async function getEntryData() {
		// Get entries based on what journals we have
		const { data, error } = await supabase
			.from('entries')
			.select('*')
			.order('date', { ascending: false })
			.order('created_at', { ascending: false });
		if (error) {
			console.error('Error fetching Entries', error);
			return {
				status: 500,
				error: 'Could not fetch entries'
			};
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
</script>

<div class="frame">
	<!-- Banner -->
	<div class="banner">
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

	<!-- Journals (Dynamic) -->
	<div class="journal-label">{deskState.value}</div>
	<div class="journal-container">
		{#if deskState === DeskStates.Viewing}
			{#each journalDatas as journalData}
				<Journal
					{journalData}
					journalState={JournalStates.Displaying}
					entryDatas={entryDatas.filter((entry) => entry.journal === journalData.id)}
					on:selectJournal={selectJournal}
					on:deleteJournal={deleteJournal}
				/>
			{/each}
			<Journal
				journalData={{ type: 'new' }}
				journalState={JournalStates.Displaying}
				{entryDatas}
				on:selectJournal={selectJournal}
			/>
		{:else if deskState === DeskStates.Styling}
			{#each Object.values(JournalTypes) as journalData}
				<Journal
					journalData={{ type: journalData.value }}
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
			<Journal
				journalData={$currentJournal}
				journalState={JournalStates.Editing}
				entryDatas={entryDatas.filter((entry) => entry.journal === $currentJournal.id)}
			/>
		{/if}
	</div>
</div>

<style>
	.frame {
		/* position: relative; */
		background-color: lavender;
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
		background-color: red;
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

	.name {
		color: white;
		font-size: 2rem;
	}

	.journal-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		gap: 1rem;
	}
</style>
