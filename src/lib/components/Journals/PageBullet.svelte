<script>
	import { currentEntry } from '$lib/stores.js';
	import { JournalStates } from '$lib/enums.js';

	export let journalState;
	export let entryData;
</script>

<div class="frame">
	<!-- {#if journalState === JournalStates.Editing} -->
		<div class="header">
			<input
				class="entry title"
				bind:value={entryData.title}
				placeholder="Title here"
				maxlength="50"
			/>
			<input class="entry date" type="date" bind:value={entryData.date} tabindex="-1" />
		</div>
		<div class="body">
			<textarea class="entry text" bind:value={entryData.text} placeholder="What's going on today?"
			></textarea>
		</div>
		<div class="footer"></div>
		<div class="margin-left"></div>
		<div class="margin-right"></div>
	<!-- {/if} -->
</div>

<style>
	.frame {
		position: relative;
		display: grid;
		width: 100%;
		height: 100%;
		grid-template-areas:
			'ml    h   mr'
			'ml    b   mr'
			'ml    f   mr';
		grid-template-columns: 2rem auto 2rem;
		grid-template-rows: 4rem auto 2rem;
		background-color: hsl(64, 23%, 88%);
		background-image: radial-gradient(circle, hsl(101, 33%, 68%) 1px, transparent 1px);
		background-size: 1rem 1rem;
		background-position: 50% 50%;

		/* font-optical-sizing: auto; */
		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		color: hsl(0, 3%, 23%);
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
