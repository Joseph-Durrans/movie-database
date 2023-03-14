<script lang="ts">
	import type { PageData } from "$lib/types";

	export let data: PageData;

	let cursor = 0;
</script>

{#each data.movies as movie}
	{movie.title}
{/each}

<form action="/?paginate" method="post">
	<input type="hidden" name="cursor" value={cursor} />
	<input type="hidden" name="limit" value={data.limit} />
	<button type="submit">Load more</button>
</form>
