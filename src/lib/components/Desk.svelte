<script>
	import { username } from '$lib/stores.js';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';
	import JournalLegal from './JournalLegal.svelte';
	import Shelf from './Shelf.svelte';
	import { DeskStates } from '$lib/enums.js';
	import DisplayLegal from './Journals/DisplayLegal.svelte';
	import Stack from './Stack.svelte';

	let journalData = [];
	let deskState = DeskStates.Viewing;

	let journalName = '';

	let currentJournal;

	let currentJournalType;

	onMount(() => {
		subscribeToDatabase();
		getJournalData();
	});

	function subscribeToDatabase() {
		const subscription = supabase
			.channel('journal_channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'journals'
				},
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							console.log('new', payload.new);
							journalData = [...journalData, payload.new];
							break;
						case 'DELETE':
							console.log('old', payload.old);
							journalData = journalData.filter((journalData) => journalData.id !== payload.old.id);
							break;
						case 'UPDATE':
							console.log('old', payload.old);
							entryData = [...entryData];
							break;
					}
				}
			)
			.subscribe();
	}

	async function getJournalData() {
		// Get Journals
		const { data, error } = await supabase.from('journals').select('*').eq('username', $username);
		if (error) {
			console.error('Error fetching journals', error);
			return {
				status: 500,
				error: 'Could not fetch journals'
			};
		}
		journalData = data ?? [];
	}

	function logOut() {
		localStorage.removeItem('username');
		$username = '';
	}

	function newJournal() {
		deskState = DeskStates.Styling;
	}

	function selectJournal(event) {
		console.log(event.detail);
		currentJournalType = event.detail;
		deskState = DeskStates.Naming;
	}

	async function submitJournal() {
		const { data, error } = await supabase
			.from('journals')
			.insert([{ title: journalName, username: $username, type: currentJournalType }])
			.select();
		if (error) {
			console.log('ERROR SAVING');
		} else {
			console.log(data);
		}

		journalName = '';
		deskState = DeskStates.Editing;
	}

	function goBack() {
		deskState = DeskStates.Viewing;
	}

	function editMode() {
		deskState = DeskStates.Editing;
	}
</script>

<div class="frame">
	<!-- Banner -->
	<div class="banner">
		<div class="left">
			{#if deskState !== DeskStates.Viewing}
				<button on:click={goBack}>Back</button>
			{/if}
		</div>
		<div class="middle">
			<div class="name">{$username}'s desk</div>
		</div>
		<div class="right">
			{#if $username}
				<button on:click={logOut}>Logout</button>
			{/if}
		</div>
	</div>

	<!-- Shelf -->
	{#if deskState === DeskStates.Viewing}
		<div>Looking at current journals</div>
		<Stack {journalData} on:newJournal={newJournal} on:editMode={editMode} />
	{:else if deskState === DeskStates.Styling}
		<div>Styling new Journal</div>
		<Shelf {deskState} on:selectJournal={selectJournal} />
	{:else if deskState === DeskStates.Naming}
		<div>Naming our journal</div>
		<form on:submit|preventDefault={submitJournal}>
			<input placeholder="Name your Journal" type="text" bind:value={journalName} />
			<button type="submit">SUBMIT</button>
		</form>
	{:else if deskState === DeskStates.Editing}
		<div>Editing our journal</div>
		<JournalLegal />
	{/if}
</div>

<style>
	.frame {
		position: fixed;
		/* height: 100vh; */
		width: 100vw;
		background-color: lavender;
	}

	.banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		background-color: red;
	}

	.name {
		color: tan;
		font-size: 2rem;
	}
</style>
