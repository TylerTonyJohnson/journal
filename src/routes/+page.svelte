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
		<Login />
	{:else}
		<Desk />
	{/if}
</div>
