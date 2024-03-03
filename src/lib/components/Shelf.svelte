<script>
	import DisplayBullet from './Journals/DisplayBullet.svelte';
	import DisplayLegal from './Journals/DisplayLegal.svelte';
    import DisplayComposition from './Journals/DisplayComposition.svelte';

    export let deskState;
</script>

<div class="frame">
	<div class="journal-card-container">
		<DisplayLegal on:selectJournal {deskState} />
		<DisplayBullet on:selectJournal {deskState}/>
        <DisplayComposition on:selectJournal {deskState}/>
	</div>
</div>

<style>
	.frame {
		/* display: grid; */
		/* grid-auto-flow: row; */
		/* gap: 1rem; */
		border: solid lightsalmon 2px;
	}

	.journal-card-container {
		display: grid;
		justify-content: center;
		align-items: center;
		margin-inline: auto;
		grid-template-columns: repeat(auto-fill, minmax(8.5rem, 1fr));
		gap: 1rem;
		/* width: 100%; */
		padding: 1rem;
	}
</style>
