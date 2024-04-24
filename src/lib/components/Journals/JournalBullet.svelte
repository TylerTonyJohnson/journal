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
	}
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<div class="spine"></div>
	<div class="content">
		<!-- Back Cover -->
		<div class="cover-back">
			<div class="outside"></div>
			<div class="inside"></div>
		</div>
		<!-- Pages -->
		<div class="pages">
			<PageBullet {journalState} entryData={currentEntry} on:inputChange />
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
						<form class="form" on:submit={submitName}>
							<input
								class="journal-title"
								type="text"
								bind:value={$currentJournal.title}
								placeholder="Choose a name"
							/>
						</form>
					{:else}
						<div class="title">{journalData.title}</div>
					{/if}
				</div>
				{#if journalState === JournalStates.Naming && $currentJournal.title}
					<button class="button" type="submit" on:click={submitName}>SUBMIT</button>
				{/if}
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

		--cover-color-outer: rgb(44, 47, 69);
		--cover-color-inner: hsl(233, 31%, 38%);
	}

	.spine {
		height: 100%;
		width: 1rem;
		background-color: var(--cover-color-outer);
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;

		box-shadow: inset -2px -2px 4px 0px #0006;
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
		background-color: var(--cover-color-inner);
		border: solid #0004 2px;
		box-shadow:
			inset -7px 0 9px -7px rgba(0, 0, 0, 0.4),
			0px 0 10px 5px #0004;
	}

	.cover-front > .outside {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: start;
		align-items: center;

		background-color: var(--cover-color-outer);
		/* background-size: contain; */
		/* background-position: 0 0; */
		backface-visibility: hidden;
		border-radius: 0 0.75rem 0.75rem 0;

		box-shadow:
			inset 1px 1px 4px 1px #fff2,
			inset -1px -1px 4px 1px #0004;
	}

	.box {
		width: 75%;
		height: 25%;
		display: flex;
		/* justify-content: start; */
		overflow: hidden;

		background-color: transparent;
		margin-top: 3rem;
		box-shadow:
			inset 1px 1px 2px 0px #0004,
			inset -1px -1px 2px 0px #fff4;
		border-radius: 0.5rem;
	}

	.form {
		width: 100%;
		height: 100%;
	}

	.journal-title {
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: #fff1;
		border: none;
		outline: none;
		color: white;
		font-size: 1.25rem;
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
		color: white;
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
		animation: open 0.5s ease-in-out forwards;
	}

	@keyframes open {
		0% {
			transform: rotateY(0deg);
		}
		100% {
			transform: rotateY(-180deg);
		}
	}
</style>
