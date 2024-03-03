<script>
	import PageBullet from './PageBullet.svelte';

	export let name;
	export let isEditing;
</script>

<div class="frame">
	{#if !isEditing}
		<div class="name">{name}</div>
	{/if}
	<PageBullet {name} {isEditing} />
</div>

<style>
	.frame {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.name {
		position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
		width: 100%;
		height: 2rem;
		outline: none;
		border: none;
		background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.5) 50%, transparent 100%);
        font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
        font-size: 2rem;
		color: hsl(0, 3%, 23%);
	}
</style>
