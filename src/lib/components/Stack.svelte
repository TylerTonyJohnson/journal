<script>
	import { createEventDispatcher } from 'svelte';

	import DisplayLegal from './Journals/DisplayLegal.svelte';
	import DisplayBullet from './Journals/DisplayBullet.svelte';
	import DisplayComposition from './Journals/DisplayComposition.svelte';
	import DisplayNew from './Journals/DisplayNew.svelte';
	import Journal from './Journals/Journal.svelte';

	export let journalData;

	const dispatch = createEventDispatcher();

	function newJournal() {
		console.log('tooter');
		dispatch('newJournal');
	}

	function selectJournal() {
		console.log('Stack - selectJournal');
		dispatch('editMode');
	}
</script>

<div>HI</div>
<div class="journal-container">
	{#if journalData}
		{#each journalData as journal}
			<!-- {#if journal.type === 'legal'}
				<DisplayLegal name={journal.title} on:selectJournal={selectJournal} />
			{:else if journal.type === 'bullet'}
				<DisplayBullet name={journal.title} on:selectJournal={selectJournal} />
			{:else if journal.type === 'composition'}
				<DisplayComposition name={journal.title} on:selectJournal={selectJournal} />
			{:else}
				<div>{journal.type}</div>
			{/if} -->
			<Journal type={journal.type} name={journal.title} />
		{/each}
	{:else}
		<p>No journals yet!</p>
	{/if}
	<DisplayNew on:selectJournal={newJournal} />
</div>

<style>
	.journal-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		border: solid green 2px;
		padding: 1rem;
		gap: 1rem;
	}
</style>
