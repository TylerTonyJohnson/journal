<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<button class="frame" type="button" on:click={handleClick}>
	<svg class="icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10 42C8.9 42 7.95833 41.6083 7.175 40.825C6.39167 40.0417 6 39.1 6 38V10C6 8.9 6.39167 7.95833 7.175 7.175C7.95833 6.39167 8.9 6 10 6H24V10H10V38H24V42H10ZM32 34L29.25 31.1L34.35 26H18V22H34.35L29.25 16.9L32 14L42 24L32 34Z"
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
