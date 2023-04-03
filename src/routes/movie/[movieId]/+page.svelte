<script lang="ts">
	import Rating from "$lib/components/rating/Rating.svelte";

	import type { PageData } from "$lib/types";

	export let data: PageData;

	let price = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	let date = new Intl.DateTimeFormat("en-GB", {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	});

	let { movie } = data;
	console.log(movie.genre);
</script>

<div class="container grid gap-4 md:gap-10 md:grid-cols-2 lg:grid-cols-3 ">
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
	<div class="md:col-span-1 lg:col-span-2">
		{#if movie.releaseDate}
			<p>{date.format(movie.releaseDate)}</p>
		{/if}

		{#if movie.title}
			<h1>{movie.title}</h1>
		{/if}

		<Rating voteAverage={movie.voteAverage} voteCount={movie.voteCount} />

		{#if movie.movieGenre}
			<div class="flex flex-wrap mt-2 mb-4 gap-2">
				{#each movie.movieGenre as genre}
					<span class="p-2 text-sm rounded-md  bg-cyan-200">{genre.genre.name}</span>
				{/each}
			</div>
		{/if}

		{#if movie.overview}
			<p>{movie.overview}</p>
		{/if}

		<ul class="flex gap-5 flex-wrap my-5">
			{#if movie.runtime}
				<li>
					<h5>Runtime</h5>
					{movie.runtime} minutes
				</li>
			{/if}

			{#if movie.budget}
				<li>
					<h5>Budget</h5>
					{price.format(movie.budget)}
				</li>
			{/if}

			{#if movie.revenue}
				<li>
					<h5>Revenue</h5>
					{price.format(movie.revenue)}
				</li>
			{/if}
		</ul>

		<div class="inline-grid grid-cols-2 gap-10">
			{#if movie.cast}
				<div>
					<h2>Cast</h2>
					<ul class="[&>li]:mb-1 my-4">
						{#each movie.cast as cast}
							<li>
								<h6>{cast.character}</h6>
								<p>{cast.person.name}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			{#if movie.crew}
				<div>
					<h2>Crew</h2>
					<ul class="[&>li]:mb-1 my-4">
						{#each movie.crew as crew}
							<li>
								<h6>{crew.job}</h6>
								<p>{crew.person.name}</p>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</div>
	</div>
</div>
