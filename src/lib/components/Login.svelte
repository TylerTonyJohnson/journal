<script>
	import { username } from '$lib/stores.js';
	// import woodTexture from '$lib/images/Wood Texture.png';

	let enteredName;

	function submitUserName() {
		if (!enteredName) return;
		username.set(enteredName);
		localStorage.setItem('username', enteredName);
	}
</script>

<form class="login" on:submit|preventDefault={submitUserName}
	style="background: url('Wood Texture.png');"
>
	<input class="input" placeholder="Choose a name" type="text" bind:value={enteredName} />
	<button class="button" type="submit">SUBMIT</button>
</form>

<style>
	.login {
		width: 50rem;
		height: 10rem;
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
		border: none;
		background-color: transparent;

		text-align: center;
		font-family: 'Nunito', sans-serif;
		font-optical-sizing: auto;
		font-weight: bolder;
		font-style: normal;
		/* outline: none; */
		/* height: 4rem; */

		color: rgba(51, 51, 51,0.15);
		text-shadow:
			1px 1px 0px rgba(255, 255, 255, 0.3),
			-1px -1px 0px rgba(0, 0, 0, 0.8);
	}

	.button {
		grid-area: button;
	}
</style>
