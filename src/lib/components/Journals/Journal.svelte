<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { createEventDispatcher, onMount } from 'svelte';

	import { username } from '$lib/stores.js';
	import { JournalStates } from '$lib/enums.js';
	import JournalBullet from './JournalBullet.svelte';
	import JournalLegal from './JournalLegal.svelte';
	import JournalNew from './JournalNew.svelte';
	import JournalComposition from './JournalComposition.svelte';

	export let journalData;
	export let journalState;
	export let entryDatas = [];

	onMount(() => {
		// const interval = setInterval(() => {
		// 	// Your function logic here
		// 	console.log('This function runs every second');
		// }, 1000); // 10000 milliseconds = 10 seconds
		// return () => clearInterval(interval);
	});

	let inputTimer;

	function setTimer() {
		clearTimeout(inputTimer);
		inputTimer = setTimeout(saveEntry, 2000);
	}

	const dummyEntry = {
		title: '',
		date: new Date().toLocaleDateString('en-CA'),
		text: ''
	};

	let currentPage = 0;

	newEntry();

	// $: newEntrys = [dummyEntry, ...entryDatas];

	const dispatch = createEventDispatcher();

	function selectJournal() {
		console.log('selecting this journal');
		dispatch('selectJournal', journalData);
	}

	function saveJournal() {
		console.log('Saving Journal from Journal');
		dispatch('saveJournal', journalData);
	}

	function deleteJournal() {
		console.log('Deleting journal from Journal');
		dispatch('deleteJournal', journalData);
	}

	async function saveEntry() {
		if (!entryDatas[currentPage].title && !entryDatas[currentPage].text) {
			console.log('Missing data!');
			return;
		}

		const saveData = { ...entryDatas[currentPage], username: $username, journal: journalData.id };

		const { data, error } = await supabase.from('entries').upsert(saveData).select();
		if (error) {
			console.log('ERROR SAVING');
		} else {
			console.log(data);
		}
	}

	function newEntry() {
		entryDatas = [dummyEntry, ...entryDatas];
		currentPage = 0;
	}

	async function deleteEntry() {
		const { data, error } = await supabase
			.from('entries')
			.delete()
			.eq('id', entryDatas[currentPage].id);

		if (error) {
			console.log('ERROR DELETING');
		} else {
			console.log(data);
		}
	}

	function nextPage() {
		currentPage = Math.min(currentPage + 1, entryDatas.length - 1);

		// currentPage = (currentPage + 1) % entryDatas.length;
	}
	function previousPage() {
		currentPage = Math.max(currentPage - 1, 0);
		// currentPage = (currentPage - 1 + entryDatas.length) % entryDatas.length;
	}

	function inputChange(event) {
		// console.log(event.detail);
		setTimer();
	}
</script>

<div class="frame">
	<!-- Save Button -->
	<!-- {#if journalState === JournalStates.Editing}
		<div class="buttons">
			<button type="button" on:click={previousPage} disabled={currentPage <= 0}>PREVIOUS</button>
			<button type="button" on:click={newEntry}>NEW</button>
			<button type="button" on:click={saveEntry}>SAVE</button>
			<button type="button" on:click={deleteEntry}>DELETE</button>
			<button type="button" on:click={nextPage} disabled={currentPage >= entryDatas.length - 1}
				>NEXT</button
			>
		</div>
	{/if} -->

	<!-- Journal -->
	{#if journalData}
		<div
			class="journal-frame"
			on:click={selectJournal}
			class:viewing={journalState === JournalStates.Viewing}
			class:editing={journalState === JournalStates.Editing}
			class:naming={journalState === JournalStates.Naming}
		>
			{#if journalData.type === 'none'}
				<div>NO TYPE</div>
			{:else if journalData.type === 'new'}
				<JournalNew />
			{:else if journalData.type === 'bullet'}
				<JournalBullet
					{journalData}
					{journalState}
					{entryDatas}
					{currentPage}
					on:inputChange={inputChange}
					on:submitName={saveJournal}
				/>
			{:else if journalData.type === 'legal'}
				<JournalLegal
					{journalData}
					{journalState}
					{entryDatas}
					{currentPage}
					on:submitName={saveJournal}
				/>
			{:else if journalData.type === 'composition'}
				<JournalComposition
					{journalData}
					{journalState}
					{entryDatas}
					{currentPage}
					on:submitName={saveJournal}
				/>
			{/if}
			{#if journalState === JournalStates.Viewing && journalData.type !== 'new'}
				<button class="overlay material-symbols-outlined" on:click|stopPropagation={deleteJournal}>
					delete_forever
				</button>
			{/if}
		</div>
	{/if}
</div>

<style>
	.journal-frame {
		position: relative;
		display: flex;
		width: 8.5rem;
		max-width: 100%;
		height: 11rem;
		border-radius: 1rem;
		/* overflow: hidden; */
		box-shadow: darkgray 0 0 1rem;
		transition: all 0.25s ease-in-out;
		cursor: pointer;
		/* background-color: maroon; */
	}

	.journal-frame.viewing {
		width: 8.5rem;
		height: 11rem;
	}

	.journal-frame.editing {
		width: 34rem;
		height: 44rem;
	}

	.journal-frame.naming {
		width: 17rem;
		height: 22rem;
	}

	.viewing:hover {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		scale: 1.1;
	}

	.overlay {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
		color: red;
		user-select: none;
	}

	.buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
