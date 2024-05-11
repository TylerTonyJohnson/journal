<script>
	import { onMount } from 'svelte';
	import { username, deskState } from '$lib/stores.js';
	import { DeskStates } from '$lib/enums.js';
	import Desk from '$lib/components/Desk.svelte';
	import '../styles.css';
	import Nameplate from '../lib/components/Journals/Nameplate.svelte';

	onMount(() => {
		// Check local storage for username
		const storedUserName = localStorage.getItem('username');
		if (!storedUserName) return;

		switch (!!storedUserName) {
			case true:
				$username = storedUserName;
				$deskState = DeskStates.Viewing;
				break;
			case false:
				$username = '';
				$deskState = DeskStates.Entering;
				break;
		}
	});
</script>

<div class="frame" style="background-image: url('/images/Black Desk.png');">
	<Nameplate />
	{#if $username}
		<Desk />
	{/if}
</div>

<style>
	.frame {
		display: flex;
		width: 100vw;
		min-height: 100vh;
		background-size: cover;
		background-position: center center;
	}
</style>
