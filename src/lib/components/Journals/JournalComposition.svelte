<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { createEventDispatcher } from 'svelte';
	import { JournalStates } from '$lib/enums.js';
	import { currentJournal } from '$lib/stores.js';

	import PageComposition from './PageComposition.svelte';

	export let journalData;
	export let journalState;
	export let entryDatas;
	export let currentPage;

	$: currentEntry = entryDatas[currentPage];
	$: console.log('entries', entryDatas);

	const dispatch = createEventDispatcher();

	function submitName() {
		dispatch('submitName');
	}
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<div class="spine" />
	<div class="content">
		<!--  Back Cover -->
		<div class="cover-back">
			<div class="outside"></div>
			<div class="inside"></div>
		</div>
		<!-- Pages -->
		<div class="pages">
			<PageComposition {journalState} entryData={currentEntry} />
		</div>
		<!-- Front Cover -->
		<div
			class="cover-front"
			class:peel={journalState === JournalStates.Styling}
			class:flip={journalState === JournalStates.Viewing}
			class:open={journalState === JournalStates.Editing}
		>
			<div 
                class="inside" 
                class:faded={journalState === JournalStates.Editing}
            ></div>
			<div class="outside" style="background-image: url('Composition Texture.png')">
				<div class="box">
					{#if journalState === JournalStates.Naming}
						<form on:submit={submitName}>
							<input type="text" bind:value={$currentJournal.title} placeholder="Choose a name" />
							<button type="submit">SUBMIT</button>
						</form>
					{:else}
						<div class="title">{journalData.title}</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

<style>
	.frame {
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
	}

	.spine {
		height: 100%;
		width: 1rem;
		background-color: rgb(25, 24, 24);
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}

	.content {
		position: relative;
		flex: 1;
		perspective: 35rem;
	}

	.cover-back,
	.cover-front,
	.pages {
		position: absolute;
		inset: 0;
	}

	.cover-front > .inside {
		position: absolute;
		inset: 0;
		transform: rotateY(-180deg);
		border-radius: 0.75rem 0 0 0.75rem;
		background-size: contain;
		background-position: 0 0;
		backface-visibility: hidden;
		background-color: hsl(220, 18%, 90%);
		/* border: solid hsl(220,18%,85%) 2px; */
		/* box-shadow: inset -3px 0px 3px #0003; */
		/* box-shadow: inset 10px -10px 15px -5px rgba(0, 0, 0, 0.5); */
		box-shadow:
			inset -7px 0 9px -7px rgba(0, 0, 0, 0.4),
			0px 0 10px 5px #0004;
	}

	.cover-front > .outside {
		position: absolute;
		inset: 0;
		display: flex;

		background-size: contain;
		background-position: 0 0;
		backface-visibility: hidden;
		border-radius: 0 0.75rem 0.75rem 0;
	}

	.box {
		width: 75%;
		height: 25%;
		display: flex;
		justify-content: center;
		overflow: hidden;

		background-color: white;
		margin: 3rem auto auto auto;
		border: solid black 1px;
		border-radius: 0.5rem;
	}

	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 2rem;
		top: 2rem;
		text-decoration: underline;
		text-decoration-thickness: 1px;

		pointer-events: none;
		user-select: none;

		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		font-size: 1.25rem;
		color: black;
	}

	/* Attachable styles */
	.faded {
		mask-image: linear-gradient(to left, black 0, black 20%, transparent 40%);
	}

	.peel {
		--fold-dist: 0rem;
		--fold-angle: -30deg;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%);

		transition: clip-path 0.25s ease-in-out;
	}

	.peel::before {
		content: '';
		position: absolute;
		bottom: 0;
		right: 0;
		background: linear-gradient(
				calc(-90deg - var(--fold-angle)),
				hsl(220, 18%, 90%) 0,
				hsl(220, 18%, 90%)
			)
			no-repeat 100% 0;
		clip-path: polygon(0% 0%, 100% 0%, 0% 100%, 0% 0%);
		width: calc(var(--fold-dist) * 1.25);
		height: calc(var(--fold-dist) * 2);
		transform-origin: bottom right;
		translate: calc(-0.98 * var(--fold-dist)) calc(var(--fold-dist) * 0.61);
		rotate: calc(-1 * var(--fold-angle));
		border-top-left-radius: 1rem;
		box-shadow: 0em 0em 0.3em -0.1em rgba(0, 0, 0, 0.15);
		transition: all 0.25s ease-in-out;
		z-index: 2;
	}

	.flip,
	.open {
		transform: rotateY(0deg);
		transition: transform 0.25s ease-in-out;
		transform-origin: left;
		transform-style: preserve-3d;
	}

	.content:hover .flip {
		transform: rotateY(-160deg);
	}

	.content:hover .peel {
		--fold-dist: 3rem;
		clip-path: polygon(0% 0%, 100% 0%, 100% 69%, 16% 100%, 0% 100%, 0% 0%);
	}

	.open {
		transform: rotateY(-180deg);
	}
</style>
