<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import { createEventDispatcher } from 'svelte';
	import { JournalStates } from '$lib/enums.js';
	import { currentJournal } from '$lib/stores.js';

	import PageLegal from './PageLegal.svelte';

	export let journalData;
	export let journalState;
	export let entryDatas;
	export let currentPage;

	$: currentEntry = entryDatas[currentPage];
	// $: console.log('entries', entryDatas);

	const dispatch = createEventDispatcher();

	function submitName() {
		dispatch('submitName');
	}
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div
	class="frame"
	class:small={journalState !== JournalStates.Editing}
	class:large={journalState == JournalStates.Editing}
>
	<div class="spine" />
	<div class="content">
		<!--  Back Cover -->
		<div class="cover-back">
			<div class="outside"></div>
			<div class="inside"></div>
		</div>
		<!-- Pages -->
		<div class="pages">
			<PageLegal {journalState} entryData={currentEntry} />
		</div>
		<!-- Front Cover -->
		<div
			class="cover-front"
			class:peel={journalState === JournalStates.Styling}
			class:flip={journalState === JournalStates.Viewing}
			class:open={journalState === JournalStates.Editing}
		>
			<div class="inside" class:faded={journalState === JournalStates.Editing}></div>
			<div class="outside">
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
	.small {
		--spine-thickness: 1rem;
		--margin-top: 2rem;
		--margin-left: 1rem;
		--margin-right: 1rem;
		--margin-bottom: 1rem;
		--line-scale: 0.5;
	}

	.large {
		--spine-thickness: 3rem;
		--margin-top: 4rem;
		--margin-left: 3rem;
		--margin-right: 3rem;
		--margin-bottom: 3rem;
		--line-scale: 1;
	}

	.frame {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.spine {
		height: var(--spine-thickness);
		width: 100%;
		background-color: rgb(241, 234, 234);
		border-top-left-radius: 0rem;
		border-bottom-left-radius: 0rem;
		box-shadow: 0 2px 2px 0px #0004;
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

		backface-visibility: hidden;
		background-image: linear-gradient(
				to right,
				transparent 0,
				transparent calc(var(--margin-left) - 2px),
				hsl(23, 62%, 60%) var(--margin-left),
				hsl(23, 62%, 60%) 0,
				transparent var(--margin-left)
			),
			linear-gradient(
				to left,
				transparent 0,
				transparent calc(var(--margin-right) - 2px),
				hsl(23, 62%, 60%, 0.15) var(--margin-right),
				hsl(23, 62%, 60%, 0.15) 0,
				transparent var(--margin-right)
			),
			linear-gradient(
				to bottom,
				hsl(53, 94%, 80%) 0%,
				hsl(53, 94%, 80%) var(--margin-top),
				transparent var(--margin-top)
			),
			repeating-linear-gradient(
				to bottom,
				hsl(101, 33%, 68%) 0rem,
				hsl(101, 33%, 68%) 1px,
				hsl(53, 94%, 80%) 1px,
				hsl(53, 94%, 80%) calc(1rem * var(--line-scale))
			);
		box-shadow:
			inset -7px 0 9px -7px rgba(0, 0, 0, 0.4),
			0px 0 10px 5px #0004;
	}

	.cover-front > .outside {
		position: absolute;
		inset: 0;
		display: flex;
		backface-visibility: hidden;
		background-image: linear-gradient(
				to right,
				transparent 0,
				transparent calc(var(--margin-left) - 2px),
				hsl(23, 62%, 60%) var(--margin-left),
				hsl(23, 62%, 60%) 0,
				transparent var(--margin-left)
			),
			linear-gradient(
				to left,
				transparent 0,
				transparent calc(var(--margin-right) - 2px),
				hsl(23, 62%, 60%, 0.15) var(--margin-right),
				hsl(23, 62%, 60%, 0.15) 0,
				transparent var(--margin-right)
			),
			linear-gradient(
				to bottom,
				hsl(53, 94%, 80%) 0%,
				hsl(53, 94%, 80%) var(--margin-top),
				transparent var(--margin-top)
			),
			repeating-linear-gradient(
				to bottom,
				hsl(101, 33%, 68%) 0rem,
				hsl(101, 33%, 68%) 1px,
				hsl(53, 94%, 80%) 1px,
				hsl(53, 94%, 80%) calc(1rem * var(--line-scale))
			);
	}

	.box {
		position: absolute;
		width: 75%;
		height: 25%;
		left: 50%;
		top: 3rem;
		translate: -50% -50%;
		display: flex;
		justify-content: center;
		overflow: hidden;

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
		mask-image: linear-gradient(to bottom, black 0, black 20%, transparent 40%);
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
		transform: rotateX(0deg);
		transition: transform 0.25s ease-in-out;
		transform-origin: top;
		transform-style: preserve-3d;
	}

	.content:hover .flip {
		transform: rotateX(160deg);
	}

	.content:hover .peel {
		--fold-dist: 3rem;
		clip-path: polygon(0% 0%, 100% 0%, 100% 69%, 16% 100%, 0% 100%, 0% 0%);
	}

	.open {
		transform: rotateX(-180deg);
	}
</style>
