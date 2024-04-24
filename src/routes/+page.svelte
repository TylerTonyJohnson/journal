<script>
	import { onMount } from 'svelte';
	import { username } from '$lib/stores.js';
	import Login from '$lib/components/Login.svelte';
	import Desk from '$lib/components/Desk.svelte';
	import '../styles.css';

	onMount(() => {
		const storedUserName = localStorage.getItem('username');

		if (!storedUserName) return;

		$username = storedUserName;
	});
</script>

<div>
	{#if !$username}
		<div class='frame'>
			<Login />
		</div>
	{:else}
		<Desk />
		<!-- <Deskcopy /> -->
		<!-- <Deskcopy2 /> -->
	{/if}
</div>

<style>
	.frame {
		display: flex;
		width: 100vw;
		height: 100vh;
		/* background-color: green; */
	}

</style>
