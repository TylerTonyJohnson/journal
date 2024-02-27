<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
    import { createEventDispatcher } from "svelte";

    export let name = 'Legal Pad';
    const journalType = 'legal';

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
		<div class="binding">
			<div class="logo">{name}</div>
		</div>
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
		background-color: hsl(53, 94%, 80%);
		box-shadow: black 0 0 3px;
		border-radius: 0.1rem 0.1rem 0.5rem 0.5rem;
		overflow: hidden;
	}

	.journal:hover {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		transition: box-shadow 0.1s ease-out;
	}

	.binding {
		display: flex;
		width: 100%;
		height: 2rem;
		background-color: hsl(36, 20%, 95%);
		/* border: solid black 1px; */
		border-radius: 0.2rem;
		box-shadow: rgba(0, 0, 0, 0.5) 0 2px 5px;
	}

	.logo {
		display: flex;
		margin: auto;
		flex-direction: column;
		line-height: 1.25rem;
		font-family: 'Neuton', serif;
		font-weight: 800;
		font-style: normal;
		font-size: 1.5rem;
		color: hsl(359, 57%, 51%);
		/* background-color: orange; */
		user-select: none;
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
				transparent 1.7rem,
				hsl(23, 62%, 60%) 1.7rem,
				hsl(23, 62%, 60%) 1.8rem,
				transparent 1.8rem,
				transparent 1.9rem,
				hsl(23, 62%, 60%) 1.9rem,
				hsl(23, 62%, 60%) 2rem,
				transparent 2rem
			),
			linear-gradient(
				to left,
				transparent 0,
				transparent 1.7rem,
				hsl(23, 62%, 60%, 0.15) 1.7rem,
				hsl(23, 62%, 60%, 0.15) 1.8rem,
				transparent 1.8rem,
				transparent 1.9rem,
				hsl(23, 62%, 60%, 0.15) 1.9rem,
				hsl(23, 62%, 60%, 0.15) 2rem,
				transparent 2rem
			);
	}

	.header {
		height: 2rem;
	}

	.text-box {
		background-image: repeating-linear-gradient(
			to bottom,
			hsl(101, 33%, 68%) 0rem,
			hsl(101, 33%, 68%) 0.1rem,
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
