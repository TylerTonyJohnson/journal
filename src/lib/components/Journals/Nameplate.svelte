<script>
	import { username, deskState } from '$lib/stores.js';
	import { DeskStates } from '$lib/enums.js';
	import { fade } from 'svelte/transition';

	import ButtonBack from '$lib/components/buttons/ButtonBack.svelte';
	import ButtonLogout from '$lib/components/buttons/ButtonLogout.svelte';
	import ButtonMenu from '$lib/components/buttons/ButtonMenu.svelte';

	$: enteredName = $username || '';

	$: entering = $deskState === DeskStates.Entering;

	// ---------- Functions ----------

	function logIn() {
		if (!enteredName) return;
		$username = enteredName;
		localStorage.setItem('username', enteredName);
		// $deskState = DeskStates.Viewing;
	}

	function logOut() {
		$username = '';
		enteredName = '';
		localStorage.removeItem('username');
		$deskState = DeskStates.Entering;
	}

	function goBack() {
		console.log('go back');
		switch ($deskState) {
			case DeskStates.Entering:
				$deskState = DeskStates.Entering;
				break;
			case DeskStates.Viewing:
				$deskState = DeskStates.Viewing;
				break;
			case DeskStates.Naming:
				$deskState = DeskStates.Styling;
				break;
			case DeskStates.Styling:
				$deskState = DeskStates.Viewing;
				break;
			case DeskStates.Editing:
				$deskState = DeskStates.Viewing;
				break;
		}
	}

	function toggle() {
		switch ($deskState) {
			case DeskStates.Viewing:
				$deskState = DeskStates.Creating;
				break;
			case DeskStates.Creating:
				$deskState = DeskStates.Styling;
				break;
			case DeskStates.Styling:
				$deskState = DeskStates.Editing;
				break;
			case DeskStates.Editing:
				$deskState = DeskStates.Viewing;
				break;
		}
	
	}
</script>

<!-- 
    ---------- STRUCTURE ----------
 -->

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="frame"
	class:entering
	style="background-image: url('/images/Name Plate Background.png');"
>
	<div class="border">
		<div class="corner br" style="background-image: url('/images/Name Plate Corner Ornate.svg');" />
		<div class="corner tl" style="background-image: url('/images/Name Plate Corner Ornate.svg');" />
		<div class="corner tr" />
		<div class="corner bl" />
	</div>
	<form class="content" on:submit|preventDefault={logIn}>
		<input
			class="input"
			disabled={$username}
			placeholder="Enter your name"
			type="text"
			bind:value={enteredName}
			style="border-image-source: url('/images/Name Border.svg');"
		/>
	</form>
	{#if !entering}
		{#if $deskState === DeskStates.Editing || $deskState === DeskStates.Styling || $deskState === DeskStates.Naming}
			<div class="buttons left" in:fade={{ delay: 1000 }} out:fade={{ duration: 250 }}>
				<ButtonBack on:click={goBack} />
			</div>
		{/if}
		<div class="buttons right" in:fade={{ delay: 1000 }} out:fade={{ duration: 250 }}>
			<ButtonLogout on:click={logOut} />
			<ButtonMenu on:click={toggle} />
		</div>
	{/if}
</div>

<style>
	.frame {
		position: absolute;
		left: 50%;
		top: 0;
		translate: -50% 0;

		height: 8rem;
		width: 100%;
		background-color: black;

		transition-property: width, top;
		transition-duration: 0.5s;
		transition-delay: 0.5s, 0s;

		background-size: contain;
		/* background-size: cover; */
		background-position: center;
		background-repeat: no-repeat;

		box-shadow: -10px 10px 10px rgba(0, 0, 0, 0.5);
	}

	.border {
		position: absolute;
		inset: 0;

		display: grid;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1rem 1fr 1rem;
		grid-template-areas:
			'tl tr tr'
			'tl .  br'
			'bl bl br';

		padding: 1rem;
		gap: 0.1rem;
	}

	/* CORNERS */

	.corner {
		background-repeat: no-repeat;
	}

	.tl {
		grid-area: tl;
		background-size: contain;
		aspect-ratio: 1 / 1;
	}

	.tr {
		grid-area: tr;
		border-top: solid 1px #d9b765;
		border-right: solid 1px #d9b765;
	}

	.bl {
		grid-area: bl;
		border-bottom: solid 1px #d9b765;
		border-left: solid 1px #d9b765;
	}

	.br {
		grid-area: br;
		aspect-ratio: 1 / 1;
		background-size: cover;
		rotate: 180deg;
	}

	/* NAME PLATE */

	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 50%;
		translate: -50% 0;

		display: grid;
		place-items: center;
		padding: 1rem;
	}

	/* INPUT */

	.input {
		font-size: 1.5rem;
		width: 26rem;
		height: 50px;

		border-image-slice: 10;
		border-image-width: 5;
		border-image-outset: 0;
		border-image-repeat: round;

		outline: none;
		background-color: transparent;

		text-align: center;
		font-family: 'Princess', sans-serif;

		/* overflow: visible; */

		color: #d9b765;
	}

	.entering {
		top: calc(50% - 192px / 2);
		width: 36rem;
		transition-delay: 0s, 0s;
	}

	.frame:not(.entering) .input {
		border: none;
	}

	@keyframes pulse {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
		100% {
			opacity: 1;
		}
	}

	.buttons {
		position: absolute;
		width: 10rem;
		height: 100%;
		top: 0;
		display: grid;
		place-items: center;
		/* background-color: teal; */
	}

	.left {
		left: 0;
	}

	.right {
		right: 0;
	}
</style>
