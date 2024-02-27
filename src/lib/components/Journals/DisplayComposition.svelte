<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

 <script>
    import { createEventDispatcher } from "svelte";

    export let name = 'Composition';
    const journalType = 'composition';

    const dispatch = createEventDispatcher();

	function selectJournal() {
		dispatch('selectJournal', journalType);
	}

</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame" on:click={selectJournal}>
	<div class="journal">
		<div class="label"><span>{name}</span></div>
		<div class="paper">
			<div class="header"></div>
			<div class="text-box"></div>
		</div>
	</div>
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

<style>
	.frame {
		width: 8rem;
		height: 11rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}

	.journal {
		position: relative;
        width: 100%;
        height: 100%;
		display: flex;
		flex-direction: column;
		background-color: hsl(260,20%,97%);
		box-shadow: black 0 0 3px;
		border-radius: 1rem;
		overflow: hidden;
	}

	.journal:hover {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		transition: box-shadow 0.1s ease-out;
	}

	.label {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 2rem;

		font-family: 'Caveat', cursive;
		font-optical-sizing: auto;
		font-weight: 900;
		font-style: normal;
		font-size: 1.75rem;
		line-height: 1.25rem;
		color: hsl(356, 23%, 14%);
		/* background-color: orange; */
		user-select: none;
		background-image: linear-gradient(
			to bottom,
			rgba(0, 0, 0, 0.35),
			rgba(0, 0, 0, 0.25),
			rgba(0, 0, 0, 0.2),
			rgba(0, 0, 0, 0)
		);
	}

	.paper {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-family: 'Protest Riot', sans-serif;
		font-weight: 100;
		font-style: normal;
		color: hsl(35, 10%, 25%);
		background-image: linear-gradient(
				to right,
				transparent 0,
				transparent 1.8rem,
				hsl(260,4%,85%) 1.8rem,
				transparent 1.8rem,
				transparent 1.9rem,
				hsl(260,4%,85%) 1.9rem,
				hsl(260,4%,85%) 2rem,
				transparent 2rem
			),
			linear-gradient(
				to left,
				transparent 0,
				transparent 1.8rem,
				hsl(260,4%,85%, 0.25) 1.8rem,
				transparent 1.8rem,
				transparent 1.9rem,
				hsl(260,4%,85%, 0.25) 1.9rem,
				hsl(260,4%,85%, 0.25) 2rem,
				transparent 2rem
			);
	}

	.header {
		height: 2rem;
	}

	.text-box {
		background-image: repeating-linear-gradient(
			to bottom,
			hsl(260,4%,85%) 0rem,
			hsl(260,4%,85%) 0.1rem,
			transparent 0.1rem,
			transparent 1rem
		);
		resize: none;
		outline: none;
		/* inset: 0; */
		flex: 1;
		background-color: transparent;
		outline: none;
		border: none;
		padding: 0.2rem 4rem 0rem 4rem;
		/* inset: 3rem; */
		font-family: inherit;
		color: inherit;
		line-height: 1rem;
	}
</style>
