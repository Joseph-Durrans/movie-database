<script lang="ts">
	import { page } from "$app/stores";
	import Rating from "$lib/components/rating/Rating.svelte";
	import type { PageData } from "$lib/types";

	const submit = function (this: HTMLSelectElement, e: Event) {
		e.preventDefault();

		this.form?.submit();
	};

	const pageUrl = (page: unknown) => {
		const url = $page.url;
		url.searchParams.set("page", page as string);
		return url.toString();
	};

	export let data: PageData;

	let selected: string | number;
</script>

<form action="" class="container mb-4">
	<div class="flex gap-4 items-center">
		<label for="genre" class="font-bold text-xl">Genre</label>
		<select name="genre" id="genre" class="p-2 text-sm rounded-md border-2 border-black" on:change={submit} multiple>
			<option value="">All</option>
			{#each data.genres as genre}
				<option value={genre.id} selected={data.genre === genre.id}>{genre.name}</option>
			{/each}
		</select>
	</div>

	<input type="hidden" name="page" value={data.page} />
</form>

<div class="container grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	{#if data.movies}
		{#each data.movies as movie}
			<a class="w-100" href="/movie/{movie.id}">
				{#if movie.posterPath}
					<img
						onerror="this.src='https://via.placeholder.com/300x450?text=Image+Unavailable'"
						src="https://image.tmdb.org/t/p/original{movie.posterPath}"
						alt="Movie Cover"
						class="object-fill w-full"
					/>
				{:else}
					<img src="https://via.placeholder.com/300x450?text=Image+Unavailable" alt="Placeholder Cover" class="object-fill w-full" />
				{/if}

				{#if movie.title}
					<h3>{movie.title}</h3>
				{/if}

				<Rating voteAverage={movie.voteAverage} voteCount={movie.voteCount} />
			</a>
		{/each}
	{/if}
</div>

<div class="container flex items-center justify-center gap-10 text-lg w-full my-10">
	{#if data.page > 1}
		<a href={pageUrl(data.page - 1)} class="">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
			</svg>
		</a>
	{/if}

	{data.page} / {data.pageCount}

	{#if data.page < data.pageCount}
		<a href={pageUrl(data.page + 1)}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
			</svg>
		</a>
	{/if}
</div>
