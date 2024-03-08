<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { currentEntry } from '$lib/stores.js';

	// export let entryData = {
	// 	title: '',
	// 	date: new Date().toLocaleDateString('en-CA'),
	// 	entry: ''
	// };

	export let isEditing;
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<div class="color-container">
		<div class="color-header"></div>
		<div class="color-body"></div>
	</div>
	{#if isEditing}
		<div class="header">
			<input
				class="entry title"
				bind:value={$currentEntry.title}
				placeholder="Title here"
				maxlength="50"
			/>
			<input class="entry date" type="date" bind:value={$currentEntry.date} tabindex="-1" />
		</div>
		<div class="body">
			<textarea
				class="entry text"
				bind:value={$currentEntry.text}
				placeholder="What's going on today?"
			></textarea>
		</div>
		<div class="footer"></div>
		<div class="margin-left"></div>
		<div class="margin-right"></div>
	{/if}
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

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

		/* background-color: hsl(64, 23%, 88%); */
		/* background-image: radial-gradient(circle, hsl(101, 33%, 68%) 1px, transparent 1px); */
		/* background-size: 1rem 1rem;
		background-position: 50% 50%; */
		background-image: repeating-linear-gradient(
				to bottom,
				hsl(101, 33%, 68%) 0rem,
				hsl(101, 33%, 68%) 0.1rem,
				hsl(53, 94%, 80%) 0.1rem,
				hsl(53, 94%, 80%) 1rem
			),
			linear-gradient(
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

		/* font-optical-sizing: auto; */
		/* font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		color: hsl(0, 3%, 23%); */

		/* display: flex;
		flex-direction: column;
		flex: 1;
		font-family: 'Protest Riot', sans-serif;
		font-weight: 100;
		font-style: normal;
		color: hsl(35, 10%, 25%); */
	}

	.color-container {
		position: absolute;
		display: flex;
		flex-direction: column;
		inset: 0;
	}

	.color-header {
		background-color: hsl(53, 94%, 80%);
		height: 2rem;
		width: 100%;
	}

	.color-body {
		width: 100%;
		flex: 1;
		background-image: repeating-linear-gradient(
			to bottom,
			hsl(101, 33%, 68%) 0,
			hsl(101, 33%, 68%) 2px,
			hsl(53, 94%, 80%) 0,
			hsl(53, 94%, 80%) 100%
		);
		background-size: auto 1rem;
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
</style>
