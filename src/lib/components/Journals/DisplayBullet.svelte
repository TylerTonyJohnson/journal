<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { createEventDispatcher } from 'svelte';

	export let name = 'Bullet';
	const journalType = 'bullet'

	const dispatch = createEventDispatcher();

	function selectJournal() {
		console.log('journal - selectJournal')
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
			<div class="text-space"></div>
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
	}

	.journal {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background-color: hsl(64, 23%, 88%);
		box-shadow: black 0 0 3px;
		border-radius: 0.5rem;
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
		background-image: radial-gradient(circle, hsl(101, 33%, 68%) 1px, transparent 1px);
		background-size: 1rem 1rem;
		background-position: 0% 50%;
	}
</style>
