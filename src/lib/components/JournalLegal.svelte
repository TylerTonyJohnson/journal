<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

 <script>
	import { supabase } from '$lib/supabaseClient.js';
	import { onMount } from 'svelte';

	import { username } from '$lib/stores.js';

	export let entryData;

	let currentEntry = {};

	let entryText;
	let entryTitle;
	let entryDateData;
	let entryIdData;
	$: entryDate = entryDateData.toLocaleDateString();
	resetText();

	async function saveJournalEntry() {
		console.log('saving');

		// Either create new entry or update if already exists
		const updateObject = {
			title: entryTitle,
			entry: entryText,
			username: $username
		};
		if (entryIdData) updateObject.id = entryIdData;

		const { data, error } = await supabase.from('entries').upsert([updateObject]).select();
		if (error) {
			console.log('ERROR SAVING');
		}
		resetText();
	}

	async function openJournalEntry(entryId) {
		const { data, error } = await supabase.from('entries').select('*').eq('id', entryId);
		if (error) {
			console.log('Error fetching data');
		} else {
			console.log('Opened', entryId);
		}
		// Hard-coded index, could be cleaner
		entryIdData = data[0].id;
		entryText = data[0].entry;
		entryTitle = data[0].title;
		entryDateData = new Date(data[0].created_at);
	}

	async function deleteJournalEntry(entryId) {
		if (!entryId) return;
		console.log('deleting');
		const { error } = await supabase.from('entries').delete().match({ id: entryId });
	}

	const logout = () => {
		$username = null;
	};

	onMount(() => {
		// Get supabase data
		console.log(entryData);

		// Supabase subscription
		const subscription = supabase
			.channel('entry_channel')
			.on(
				'postgres_changes',
				{
					event: '*',
					schema: 'public',
					table: 'entries'
				},
				(payload) => {
					switch (payload.eventType) {
						case 'INSERT':
							console.log('new', payload.new);
							entryData.entries = [...entryData.entries, payload.new];
							break;
						case 'DELETE':
							console.log('old', payload.old);
							entryData.entries = entryData.entries.filter((entryData) => entryData.id !== payload.old.id);
							break;
						case 'UPDATE':
							console.log('old', payload.old);
							entryData.entries = [...entryData.entries];
							break;
					}
					entryText = '';
				}
			)
			.subscribe();
	});

	function resetText() {
		entryIdData = null;
		entryText = '';
		entryTitle = '';
		entryDateData = new Date();
	}
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<div class="journal">
		<div class="binding">
			<div class="logo"><span> {$username}'s </span> <span> Journal </span></div>
		</div>
		<div class="paper">
			<div class="header">
				<input
					class="title"
					type="text"
					maxlength="20"
					bind:value={entryTitle}
					placeholder="Title here"
				/>
				<input class="date" type="text" bind:value={entryDate} />
			</div>
			<textarea
				class="text-box"
				bind:value={entryText}
				placeholder="Write your journal entry here..."
			></textarea>
		</div>
	</div>
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

<style>
	.frame {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
	}

	.journal {
		position: relative;
		display: flex;
		flex-direction: column;
		/* justify-content: start; */
		min-height: 50rem;
		width: 75%;
		background-color: hsl(53, 94%, 80%);
		box-shadow: black 0 0 3px;
		border-radius: 0 0 1rem 1rem;
		overflow: hidden;
	}

	.journal:focus-within {
		box-shadow: rgba(0, 0, 0, 0.75) 0 0 1rem;
		transition: box-shadow 0.1s ease-out;
	}

	.binding {
		display: flex;
		width: 100%;
		height: 4rem;
		background-color: hsl(36, 20%, 95%);
		/* border: solid black 1px; */
		border-radius: 0.2rem;
		box-shadow: rgba(0, 0, 0, 0.5) 0 2px 5px;
	}

	.logo {
		display: flex;
		margin: auto 0 auto 3rem;
		flex-direction: column;
		line-height: 1.25rem;
		font-family: 'Neuton', serif;
		font-weight: 800;
		font-style: normal;
		font-size: 1.5rem;
		color: hsl(359, 57%, 51%);
		/* background-color: orange; */
		user-select: none;
	}

	.paper {
		display: flex;
		flex-direction: column;
		flex: 1;
		font-family: 'Protest Riot', sans-serif;
		font-weight: 100;
		font-style: normal;
		color: hsl(35, 10%, 25%);
		background-image: linear-gradient(
				to right,
				transparent 0,
				transparent 2.7rem,
				hsl(23, 62%, 60%) 2.7rem,
				hsl(23, 62%, 60%) 2.8rem,
				transparent 2.8rem,
				transparent 2.9rem,
				hsl(23, 62%, 60%) 2.9rem,
				hsl(23, 62%, 60%) 3rem,
				transparent 3rem
			),
			linear-gradient(
				to left,
				transparent 0,
				transparent 2.7rem,
				hsl(23, 62%, 60%, 0.15) 2.7rem,
				hsl(23, 62%, 60%, 0.15) 2.8rem,
				transparent 2.8rem,
				transparent 2.9rem,
				hsl(23, 62%, 60%, 0.15) 2.9rem,
				hsl(23, 62%, 60%, 0.15) 3rem,
				transparent 3rem
			);
	}

	.header {
		height: 4rem;
		display: flex;
		align-items: end;
		justify-content: space-between;
		padding: 0 4rem;
		gap: 1rem;
		/* background-color: orange; */
	}

	.title,
	.date {
		border: none;
		outline: none;
		background: none;
		font-family: inherit;
		font-size: 1.25rem;
		height: 1.25rem;
		color: inherit;
		overflow: hidden;
	}

	.title {
		flex: 1;
	}
	.date {
		text-align: end;
	}

	.text-box {
		background-image: repeating-linear-gradient(
			to bottom,
			hsl(101, 33%, 68%) 0rem,
			hsl(101, 33%, 68%) 0.1rem,
			transparent 0.1rem,
			transparent 1rem
		);
		resize: none;
		outline: none;
		/* inset: 0; */
		flex: 1;
		background-color: transparent;
		outline: none;
		border: none;
		padding: 0.2rem 4rem 0rem 4rem;
		/* inset: 3rem; */
		font-family: inherit;
		color: inherit;
		line-height: 1rem;
	}
</style>
