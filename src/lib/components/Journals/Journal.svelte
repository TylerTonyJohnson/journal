<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { createEventDispatcher } from 'svelte';
	import { username, currentEntry, currentJournal } from '$lib/stores.js';
	import { JournalStates } from '$lib/enums.js';
	import JournalBullet from './JournalBullet.svelte';
	import JournalLegal from './JournalLegal.svelte';
	import JournalNew from './JournalNew.svelte';

	export let journalData;
	export let journalState;
	export let entryDatas;
	$: console.log(journalState);

	const dispatch = createEventDispatcher();

	function selectJournal() {
		console.log('selecting this journal');
		dispatch('selectJournal', journalData);
	}

	function saveJournal() {
		console.log('Saving Journal from Journal');
		dispatch('saveJournal', journalData);
	}

	function deleteJournal() {
		console.log('Deleting journal from Journal');
		dispatch('deleteJournal', journalData);
	}

	async function saveEntry() {
		if (!$currentEntry.title && !$currentEntry.text) {
			console.log('Missing data!');
			return;
		}

		const saveData = { ...$currentEntry, username: $username, journal: $currentJournal.id };

		const { data, error } = await supabase.from('entries').upsert(saveData).select();
		if (error) {
			console.log('ERROR SAVING');
		} else {
			console.log(data);
			clearEntryStore();
		}
	}

	function clearEntryStore() {
		$currentEntry = {
			title: '',
			date: new Date().toLocaleDateString('en-CA'),
			text: ''
		};
	}
</script>

<!-- Save Button -->
{#if journalState === JournalStates.Editing}
	<button type="button" on:click={saveEntry}>SAVE</button>
{/if}

<!-- Journal -->

<div
	class="journal-frame"
	on:click={selectJournal}
	class:display={journalState === JournalStates.Displaying}
	class:edit={journalState === JournalStates.Editing}
>
	{#if journalData.type === 'none'}
		<div>NO TYPE</div>
	{:else if journalData.type === 'new'}
		<JournalNew />
	{:else if journalData.type === 'bullet'}
		<JournalBullet {journalData} {journalState} {entryDatas} on:submitName={saveJournal} />
	{:else if journalData.type === 'legal'}
		<JournalLegal {journalData} {journalState} {entryDatas} on:submitName={saveJournal} />
	{/if}
	{#if journalState === JournalStates.Displaying && journalData.type !== 'new'}
		<button class="overlay material-symbols-outlined" on:click|stopPropagation={deleteJournal}>
			delete_forever
		</button>
	{/if}
</div>

<style>
	.journal-frame {
		position: relative;
		width: 8.5rem;
		height: 11rem;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: darkgray 0 0 1rem;
		transition: all 0.25s ease-in-out;
	}

	.journal-frame.display {
		width: 8.5rem;
		height: 11rem;
	}

	.journal-frame.edit {
		width: 34rem;
		height: 44rem;
	}

	.display:hover {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		scale: 1.1;
	}

	.overlay {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
		color: red;
	}
</style>
