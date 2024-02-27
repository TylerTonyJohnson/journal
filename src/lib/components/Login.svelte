<script>
    import { username } from '$lib/stores.js';

	let enteredName;

	function submitUserName() {
		username.set(enteredName);
        localStorage.setItem('username', enteredName);
	}
</script>

<div>
	<form on:submit|preventDefault={submitUserName}>
		<input placeholder="Choose a name" type="text" bind:value={enteredName} />
		<button type="submit">SUBMIT</button>
	</form>
</div>
