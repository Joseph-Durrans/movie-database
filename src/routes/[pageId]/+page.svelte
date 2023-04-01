<script lang="ts">
	import Rating from "$lib/components/rating/Rating.svelte";
	import type { PageData } from "$lib/types";

	export let data: PageData;
</script>

<a href="/" class="container grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
	{#each data.movies as movie}
		<div class="w-100">
			<img onerror="this.src='https://via.placeholder.com/300x450'" src="https://image.tmdb.org/t/p/original{movie.posterPath}" alt="Movie Cover" class="object-fill w-full" />
			<h3>{movie.title}</h3>
			<Rating voteAverage={movie.voteAverage} />
		</div>
	{/each}
</a>

<div class="container flex items-center gap-10 text-lg">
	{#if data.page > 1}
		<a href="/{data.page - 1}" class="">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
			</svg>
		</a>
	{/if}

	{data.page} / {data.pageCount}

	{#if data.page < data.pageCount}
		<a href="/{data.page + 1}">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
			</svg>
		</a>
	{/if}
</div>
