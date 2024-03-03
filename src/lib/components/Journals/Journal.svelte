<script>
	import { supabase } from '$lib/supabaseClient.js';
	import { username, currentEntry } from '$lib/stores.js';
	import JournalBullet from './JournalBullet.svelte';

	export let type = 'none';
	export let name = type;
	export let isEditing = false;

	function selectJournal() {
		console.log('selecting this journal');
		// toggleEdit()
	}

	function toggleEdit() {
		isEditing = !isEditing;
	}

	async function saveEntry() {
		if (!$currentEntry.title && !$currentEntry.text) {
			console.log('Missing data!');
			return;
		}

		const saveData = { ...$currentEntry, username: $username };

		const { data, error } = await supabase.from('entries').upsert(saveData).select();
		if (error) {
			console.log('ERROR SAVING');
		} else {
			console.log(data);
            clearStore();
		}
	}

	function clearStore() {
		$currentEntry = {};
	}
</script>

<!-- Save Button -->
{#if isEditing}
	<button type="button" on:click={saveEntry}>SAVE</button>
{/if}

<!-- Journal -->
<div
	class="journal-frame"
	on:click={selectJournal}
	class:display={!isEditing}
	class:edit={isEditing}
>
	{#if type === 'none'}
		<div>NO TYPE</div>
	{:else if type === 'bullet'}
		<JournalBullet {name} {isEditing} />
	{/if}
</div>

<style>
	.journal-frame {
		width: 8.5rem;
		height: 11rem;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: darkgray 0 0 1rem;
		transition: all 0.25s ease-in-out;
	}

	.journal-frame.display {
		width: 8.5rem;
		height: 11rem;
	}

	.journal-frame.edit {
		width: 34rem;
		height: 44rem;
	}

	.display:hover {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		scale: 1.1;
	}
</style>
