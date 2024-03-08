<!-- 
	-------------------- FUNCTIONALITY -------------------- 
 -->

<script>
	import PageLegal from './PageLegal.svelte';

	export let name;
	export let isEditing;
</script>

<!-- 
	-------------------- STRUCTURE -------------------- 
 -->

<div class="frame">
	<PageLegal {isEditing}/>
	{#if !isEditing}
		<div class="cover">
			<div class="binding"></div>
			<PageLegal {isEditing} />
		</div>
	{/if}

	
</div>

<!-- 
	-------------------- STYLE -------------------- 
 -->

<style>
	.frame {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.cover {
		--fold-dist: 0rem;
		--fold-angle: -30deg;
		position: absolute;
		inset: 0;

		transition: all 0.25s ease-in-out;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 100% 100%, 0% 100%, 0% 0%);
	}

	.binding {
		width: 100%;
		height: 1.5rem;
		background-color: white;
		/* box-shadow: 0 0 1rem black; */
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

	.name {
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 2rem;
		top: 2rem;
		pointer-events: none;

		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		font-size: 2rem;
		color: hsl(0, 12%, 92%);
	}
</style>
