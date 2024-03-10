<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { createEventDispatcher } from 'svelte';
	import { JournalStates } from '$lib/enums.js';
	import { currentJournal } from '$lib/stores.js';
	import PageBullet from './PageBullet.svelte';

	export let journalData;
	export let journalState;
	export let entryDatas;
	export let currentPage;



	$: currentEntry = entryDatas[currentPage];
	$: console.log('entries', entryDatas);

	const dispatch = createEventDispatcher();

	function submitName() {
		dispatch('submitName');
		console.log($currentJournal.title, 'saving in JournalBullet.svelte');
	}
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<!-- <PageBullet {journalState} /> -->
	{#if currentEntry}
		<PageBullet {journalState} entryData={currentEntry} />
	{/if}

	{#if journalState !== JournalStates.Editing}
		<div class="cover">
			{#if journalState === JournalStates.Naming}
				<form on:submit={submitName}>
					<input type="text" bind:value={$currentJournal.title} placeholder="Choose a name" />
					<button type="submit">SUBMIT</button>
				</form>
			{:else}
				<div class="title">{journalData.title}</div>
			{/if}
		</div>
	{/if}
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

<style>
	.frame {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		overflow: hidden;
	}

	.cover {
		--fold-dist: 0rem;
		--fold-angle: -30deg;
		position: absolute;
		inset: 0;
		background-image: linear-gradient(to bottom, hsl(205, 26%, 25%), hsl(207, 33%, 14%));
		transition: all 0.25s ease-in-out;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%);
	}

	.cover::before {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		background: linear-gradient(
				calc(-90deg - var(--fold-angle)),
				rgba(130, 130, 130, 0.4) 0,
				rgba(116, 116, 116, 0.4),
				rgba(166, 166, 166, 0.4)
			)
			no-repeat 100% 0;
		clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 0% 0%);
		width: calc(var(--fold-dist) * 1.25);
		height: calc(var(--fold-dist) * 2);
		transform-origin: bottom right;
		translate: calc(-0.95 * var(--fold-dist)) calc(var(--fold-dist) * 0.6);
		rotate: 30deg;
		border-top-left-radius: 1rem;
		box-shadow: 0em 0em 0.3em -0.1em rgba(0, 0, 0, 0.15);
		transition: all 0.25s ease-in-out;
	}

	.cover:hover {
		--fold-dist: 3rem;
		background-position: 100% 100%;
		clip-path: polygon(0% 0%, 100% 0%, 100% 69%, 27% 100%, 0% 100%, 0% 0%);
	}

	.title {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 2rem;
		top: 2rem;

		pointer-events: none;
		user-select: none;

		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		font-size: 2rem;
		color: hsl(0, 12%, 92%);
	}
</style>
