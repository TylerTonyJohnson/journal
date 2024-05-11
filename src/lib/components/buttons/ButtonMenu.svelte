<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="frame" type="button" on:click={handleClick}>
	<svg class="icon" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M25 49C38.2548 49 49 38.2548 49 25C49 11.7452 38.2548 1 25 1C11.7452 1 1 11.7452 1 25C1 38.2548 11.7452 49 25 49ZM13 33V37H37V33H13ZM13 13V17H37V13H13ZM13 23V27H37V23H13Z"
		/>
	</svg>
</button>

<style>
	.frame {
		position: relative;
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		transition: transform 0.05s ease-in;
	}

	.frame:hover {
		transform: scale(1.2);
	}

	.icon {
		width: 100%;
		height: 100%;
		fill: none;
		stroke: white;
		stroke-width: 1;
		stroke-linejoin: round;
	}
</style>
