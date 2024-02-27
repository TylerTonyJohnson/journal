<script>
	import { createEventDispatcher } from 'svelte';

	import DisplayLegal from './Journals/DisplayLegal.svelte';
	import DisplayBullet from './Journals/DisplayBullet.svelte';
	import DisplayComposition from './Journals/DisplayComposition.svelte';

	export let journalData;

	const dispatch = createEventDispatcher();

	function newJournal() {
		dispatch('newJournal');
	}

    function selectJournal() {
        console.log('Stack - selectJournal')
        dispatch('editMode');
    }
</script>
<div>HI</div>
<div class="journal-container">
	{#if journalData}
		{#each journalData as journal}
			{#if journal.type === 'legal'}
				<DisplayLegal name={journal.title} on:selectJournal={selectJournal} />
			{:else if journal.type === 'bullet'}
				<DisplayBullet name={journal.title} on:selectJournal={selectJournal} />
			{:else if journal.type === 'composition'}
				<DisplayComposition name={journal.title} on:selectJournal={selectJournal} />
			{:else}
				<div>{journal.type}</div>
			{/if}
		{/each}
	{:else}
		<p>No journals yet!</p>
	{/if}
	<button type="button" on:click={newJournal}>NEW</button>
</div>

<style>
	.journal-container {
		display: flex;
		flex-direction: row;
		justify-content: start;
		align-items: center;
        border: solid green 2px;
        padding: 1rem;
        gap: 1rem;
	}
</style>
