<script>
	import { username } from '$lib/stores.js';
	import { fade } from 'svelte/transition';
	// import woodTexture from '$lib/images/Wood Texture.png';

	let enteredName;

	function submitUserName() {
		if (!enteredName) return;
		username.set(enteredName);
		localStorage.setItem('username', enteredName);
	}
</script>

<form
	class="login"
	on:submit|preventDefault={submitUserName}
	style="background: url('Wood Texture.png');"
>
	<input class="input" placeholder="Choose a name" type="text" bind:value={enteredName} />
	{#if enteredName}
		<button class="button" type="submit" transition:fade>SUBMIT</button>
	{/if}
</form>

<style>
	.login {
		width: 50rem;
		height: 10rem;
		max-width: 80%;
		margin: auto;

		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-areas: 'space' 'name' 'button';
		flex-direction: column;
		justify-content: center;
		align-items: center;

		border-radius: 0.5rem;
		background-size: cover;
		box-shadow:
			1rem 1rem 1rem rgba(0, 0, 0, 0.5),
			inset -1rem -1rem 1rem rgba(0, 0, 0, 0.5),
			inset 1rem 1rem 0.5rem rgba(255, 255, 255, 0.25);
	}

	.input {
		font-size: 3rem;
		grid-area: name;
		border: solid white 4px;
		background-color: transparent;

		text-align: center;
		font-family: 'Nunito', sans-serif;
		font-optical-sizing: auto;
		font-weight: bold;
		font-style: normal;
		border-radius: 1rem;

		color: rgba(55, 44, 14, 0.75);
		text-shadow:
			1px 1px 0px rgba(255, 255, 255, 0.35),
			-1px -1px 0px rgba(0, 0, 0, 0.35);
		transition: border-color 0.5s linear;
		animation: pulse 1s infinite forwards;
		transition: border-color 1s ease;
	}

	.input:hover,
	.input:focus {
		border: solid white 4px;
		animation: none;
	}

	.input:not(:hover).input:not(:focus-within) {
		animation-play-state: running;
	}

	.input::placeholder {
		font: inherit;
		color: inherit;
	}

	@keyframes pulse {
		0% {
			border-color: white;
		}
		50% {
			border-color: rgba(255,255,255,25%);
		}
		100% {
			border-color: white;
		}
	}

	.button {
		grid-area: button;
	}
</style>
