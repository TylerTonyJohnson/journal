<script>
	import { username } from '$lib/stores.js';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { crossfade, fade, scale, fly } from 'svelte/transition';

	import { DeskStates, JournalTypes, JournalStates } from '$lib/enums.js';
	import {
		journalDatas,
		entryDatas,
		viewingShelf,
		namingShelf,
		stylingShelf,
		editingShelf,
		creatingShelf,
		deskState
	} from '$lib/stores.js';
	import Journal from './Journals/Journal.svelte';

	// Initialize
	const [send, receive] = crossfade({});

	onMount(async () => {
		subscribeToJournals();
		subscribeToEntries();
		await getJournalData().then(() => {
			// getEntryData()
		});
		$viewingShelf = [...$journalDatas];
		// console.log($journalDatas);

		switch ($journalDatas.length) {
			case 0:
				$deskState = DeskStates.Styling;
				break;
			default:
				$deskState = DeskStates.Viewing;
				break;
		}

		$deskState = DeskStates.Viewing;
	});

	$: {
		console.log($deskState);

		switch ($deskState) {
			case DeskStates.Viewing:
				// $viewingShelf = [...$journalDatas];
				break;
			case DeskStates.Styling:
				// $stylingShelf = [...$journalDatas];
				break;
			case DeskStates.Naming:
				// $namingShelf = [...$journalDatas];
				break;
			case DeskStates.Editing:
				// $editingShelf = [...$journalDatas];
				break;
		}
	}

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
							$journalDatas = [...$journalDatas, payload.new];
							break;
						case 'DELETE':
							console.log('old', payload.old);
							$journalDatas = [
								...$journalDatas.filter((journalData) => journalData.id !== payload.old.id)
							];
							break;
						case 'UPDATE':
							console.log('old', payload.old);
							$journalDatas = [...$journalDatas];
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
			// console.log(data);
		}
		$journalDatas = data ?? [];
	}

	async function getEntryData() {
		// Get entries based on what journals we have
		const { data, error } = await supabase
			.from('entries')
			.select('*')
			.in('journal', $journalDatas)
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

	function saveJournal(event) {
		const journalToSave = event.detail;
		console.log('saving this journal', journalToSave);

		setShelves($viewingShelf, $journalDatas);
		$deskState = DeskStates.Viewing;
	}

	function deleteJournal(event) {
		const journalToDelete = event.detail;

		console.log('deleting this journal', journalToDelete);
		setShelves($viewingShelf, $journalDatas);
	}

	/* 
		---------- Input ----------
	*/

	function selectJournal(event) {
		const selectedJournalData = event.detail;
		console.log(selectedJournalData);

		switch ($deskState) {
			case DeskStates.Viewing:
				if (selectedJournalData.type === 'new') {
					setShelves(
						$stylingShelf,
						Object.values(JournalTypes).map((journalData, index) => {
							return {
								id: index,
								type: journalData.value
							};
						})
					);
					console.log($stylingShelf);
					$deskState = DeskStates.Styling;
				} else {
					setShelves($editingShelf, [selectedJournalData]);
					console.log($editingShelf);
					$deskState = DeskStates.Editing;
				}
				break;
			case DeskStates.Styling:
				setShelves($namingShelf, [selectedJournalData]);
				$deskState = DeskStates.Naming;
				break;
			case DeskStates.Naming:
				break;
			case DeskStates.Editing:
				break;
		}
	}

	function setShelves(upcomingShelf, upcomingData) {
		$viewingShelf = upcomingShelf === $viewingShelf ? [...upcomingData] : [];
		$stylingShelf = upcomingShelf === $stylingShelf ? [...upcomingData] : [];
		$namingShelf = upcomingShelf === $namingShelf ? [...upcomingData] : [];
		$editingShelf = upcomingShelf === $editingShelf ? [...upcomingData] : [];

		// $viewingShelf = [...$viewingShelf];
		// $stylingShelf = [...$stylingShelf];
		// $namingShelf = [...$namingShelf];
		// $editingShelf = [...$editingShelf];
	}

	function goBack() {
		setShelves($viewingShelf, $journalDatas);
		$deskState = DeskStates.Viewing;
	}
</script>

<div
	class="frame"
	in:fly={{ y: '50%', delay: 500, duration: 500 }}
	out:fly={{ y: '50%', duration: 500 }}
	class:tl={$deskState === DeskStates.Viewing}
	class:tr={$deskState === DeskStates.Creating}
	class:bl={$deskState === DeskStates.Editing}
	class:br={$deskState === DeskStates.Styling}
>
	<!-- VIEWING -->
	<div class="shelf viewing">
		{#each $journalDatas as journalData (journalData.id)}
			<div
				class="journal-wrapper"
				animate:flip={{ duration: 200 }}
				in:receive={{ key: journalData.id, duration: 200 }}
				out:send={{ key: journalData.id, duration: 0 }}
			>
				<Journal
					{journalData}
					journalState={JournalStates.Viewing}
					on:selectJournal={selectJournal}
					on:deleteJournal={deleteJournal}
				/>
			</div>
		{/each}
	</div>

	<div class="shelf creating">
		<Journal
			journalState={JournalStates.Viewing}
			journalData={{ type: 'new', id: 'new' }}
			on:selectJournal={selectJournal}
		/>
	</div>

	<!-- STYLING -->
	<div class="shelf styling">
		{#each Object.values(JournalTypes).map((journalType, index) => {
			return { id: index, type: journalType.value };
		}) as journalData (journalData.id)}
			<div
				class="journal-wrapper"
				animate:flip={{ duration: 200 }}
				in:scale={{ duration: 200 }}
				out:send={{ key: journalData.id, duration: 0 }}
			>
				<Journal
					{journalData}
					journalState={JournalStates.Styling}
					on:selectJournal={selectJournal}
				/>
			</div>
		{/each}
	</div>

	<!-- NAMING -->
	<div class="shelf naming">
		{#each $namingShelf as journalData (journalData.id)}
			<div
				class="journal-wrapper"
				animate:flip={{ duration: 200 }}
				in:receive={{ key: journalData.id, duration: 200 }}
				out:send={{ key: journalData.id, duration: 0 }}
			>
				<Journal {journalData} journalState={JournalStates.Naming} on:saveJournal={saveJournal} />
			</div>
		{/each}
	</div>

	<!-- EDITING -->
	<div class="shelf editing">
		{#each $journalDatas as journalData (journalData.id)}
			<div
				class="journal-wrapper"
				animate:flip={{ duration: 200 }}
				in:receive={{ key: journalData.id, duration: 200 }}
				out:send={{ key: journalData.id, duration: 0 }}
			>
				<Journal {journalData} journalState={JournalStates.Editing} />
			</div>
		{/each}
	</div>
</div>

<style>
	.frame {
		position: absolute;
		min-height: calc(100vh - 8rem);
		width: 100%;
		top: 8rem;

		display: grid;
		/* grid-template-columns: 1fr auto;
		grid-template-rows: 3fr 1fr; */
		grid-template-areas:
			'viewing creating'
			'editing styling';

		transition: all 0.5s ease-in-out;

		border: solid 2px yellow;
		/* overflow: hidden; */
	}

	.tl {
		grid-template-columns: 10vw 90vw;
		grid-template-rows: calc(90vh - 8rem) 10vh;
	}

	.tr {
		grid-template-columns: 90vw 10vw;
		grid-template-rows: calc(90vh - 8rem) 10vh;
	}

	.bl {
		grid-template-columns: 10vw 90vw;
		grid-template-rows: 10vh calc(90vh - 8rem);
	}

	.br {
		grid-template-columns: 90vw 10vw;
		grid-template-rows: 10vh calc(90vh - 8rem);
	}

	.journal-wrapper {
		/* padding: 1rem;
		margin: 0.5rem; */
		/* background-color: aqua; */
		/* border: solid purple 1px; */
		/* background-image: url('Composition Texture.png'); */
	}
	.shelf {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		gap: 3rem;
		overflow: hidden;
		/* border: solid green 2px; */

		/* transition: all 1s ease-out; */
		/* background-color: green; */
	}

	.viewing {
		background-color: red;
		grid-area: viewing;
	}

	.creating {
		background-color: blue;
		grid-area: creating;
	}

	.editing {
		background-color: green;
		grid-area: editing;
	}

	.styling {
		background-color: yellow;
		grid-area: styling;
	}
</style>
