<script>
	export let entryData = {
        title: 'BUTT',
        date: 'FART',
        text: 'DOODOO',
    };
</script>

<div class="frame">
	<div class="header">
		<input
			class="entry title"
			placeholder="Title here"
			maxlength="50"
			bind:value={entryData.title}
		/>
		<input class="entry date" type="date" tabindex="-1" bind:value={entryData.date} />
	</div>
	<div class="body">
		<textarea class="entry text" placeholder="What's going on today?" bind:value={entryData.text}
		></textarea>
	</div>
</div>

<style>
	.frame {
		position: relative;
		display: grid;
		/* width: 100%;
		height: 100%; */
		grid-template-areas:
			'ml    h   mr'
			'ml    b   mr'
			'ml    f   mr';
		grid-template-columns: 2rem auto 2rem;
		grid-template-rows: 4rem auto 2rem;
		/* font-optical-sizing: auto; */
		font-family: 'Caveat', cursive;
		font-weight: 900;
		font-style: normal;
		color: hsl(0, 3%, 23%);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: end;
		grid-area: h;
		/* border: solid teal 1px; */
	}

	.body {
		grid-area: b;
		/* border: solid yellow 1px; */
	}

	.entry {
		resize: none;
		outline: none;
		border: none;
		/* border: solid red 1px; */
		font-family: inherit;
		font-weight: inherit;
		background-color: transparent;
		color: inherit;
	}

	.entry.title,
	.entry.date {
		line-height: 2rem;
		font-size: 1.5rem;
		font-weight: 100;
	}

	.entry.title {
		flex-grow: 1;
		/* padding-left: 0.1rem; */
	}

	.entry.date {
		flex-shrink: 1;
		/* padding-right: 2rem; */
		max-width: 8.5rem;
		text-align: end;
	}

	.entry.text {
		width: 100%;
		height: 100%;
		font-size: 1rem;
		line-height: 1rem;
		padding-top: 0.1rem;
	}
</style>
