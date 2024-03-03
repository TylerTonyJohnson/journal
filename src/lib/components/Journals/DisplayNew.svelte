<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { createEventDispatcher } from 'svelte';

	const journalType = 'new';

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
		<span class="material-symbols-outlined"> add_circle </span>
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
		justify-content: center;
		align-items: center;
		/* background-color: hsl(100,20%,75%); */
		/* box-shadow: black 0 0 3px; */
		border-radius: 1rem;
		overflow: hidden;
		border: dashed green 2px;
		transition: all 0.1s ease-out;
	}

	.journal:hover {
		scale: 1.1;
	}

    .material-symbols-outlined {
        color: green;
    }
</style>
