<script>
	import { JournalStates } from '$lib/enums.js';
	import { createEventDispatcher } from 'svelte';

	export let journalState;
	export let entryData;

	// Setup

	const dispatch = createEventDispatcher();

	// Functions

	function handleInputChange() {
		dispatch('inputChange', entryData);
	}
</script>

<div
	class="frame"
	class:small={journalState !== JournalStates.Editing}
	class:large={journalState == JournalStates.Editing}
>
	{#if journalState === JournalStates.Editing}
		<div class="header">
			<input
				class="entry title"
				bind:value={entryData.title}
				on:input={handleInputChange}
				placeholder="Title here"
				maxlength="50"
			/>
			<input
				class="entry date"
				type="date"
				bind:value={entryData.date}
				on:input={handleInputChange}
				tabindex="-1"
			/>
		</div>
		<div class="body">
			<textarea
				class="entry text"
				bind:value={entryData.text}
				on:input={handleInputChange}
				placeholder="What's going on today?"
			></textarea>
		</div>
		<div class="footer"></div>
		<div class="margin-left"></div>
		<div class="margin-right"></div>
	{/if}
</div>

<style>
	.small {
		--margin-top: 2rem;
		--margin-left: 1rem;
		--margin-right: 1rem;
		--margin-bottom: 1rem;
		--line-scale: 0.5;
		--corner-radius: 0.75rem;
	}
	.large {
		--margin-top: 4rem;
		--margin-left: 3rem;
		--margin-right: 3rem;
		--margin-bottom: 3rem;
		--line-scale: 1;
		--corner-radius: 1rem;
	}

	.frame {
		position: relative;
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-areas:
			'ml    h   mr'
			'ml    b   mr'
			'ml    f   mr';
		grid-template-columns: var(--margin-left) auto var(--margin-right);
		grid-template-rows: var(--margin-top) auto var(--margin-bottom);

		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		color: hsl(0, 3%, 23%);
		border-radius: 0 var(--corner-radius) var(--corner-radius) 0;

		background-color: hsl(64, 23%, 88%);
		background-image: radial-gradient(circle, hsl(101, 33%, 68%, 0.75) 1px, transparent 1px);
		background-size: calc(1rem * var(--line-scale)) calc(1rem * var(--line-scale));
		background-position: 50% 50%;
		/* font-optical-sizing: auto; */
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: end;
		grid-area: h;
		/* border: solid teal 1px; */
	}

	.body {
		grid-area: b;
		/* border: solid yellow 1px; */
	}

	.entry {
		resize: none;
		outline: none;
		border: none;
		/* border: solid red 1px; */
		font-family: inherit;
		font-weight: inherit;
		background-color: transparent;
		color: inherit;
	}

	.entry.title,
	.entry.date {
		line-height: 2rem;
		font-size: 1.5rem;
		font-weight: 100;
	}

	.entry.title {
		flex-grow: 1;
		/* padding-left: 0.1rem; */
	}

	.entry.date {
		flex-shrink: 1;
		/* padding-right: 2rem; */
		max-width: 8.5rem;
		text-align: end;
	}

	.entry.text {
		width: 100%;
		height: 100%;
		font-size: 1rem;
		line-height: 1rem;
		padding-top: 0.1rem;
	}

	.footer {
		grid-area: f;
		/* border: solid purple 1px; */
	}

	.margin-left {
		grid-area: ml;
		/* border: solid red 1px; */
	}
	.margin-right {
		grid-area: mr;
		/* border: solid green 1px; */
	}
</style>
