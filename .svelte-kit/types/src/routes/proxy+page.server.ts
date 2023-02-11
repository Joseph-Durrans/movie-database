// @ts-nocheck
import type { Actions } from "./$types";

export const actions = {
	createMovie: async ({ request }: import('./$types').RequestEvent) => {
		const { title, description, director, year, coverId } =
			Object.fromEntries(await request.formData()) as {
				title: string;
				description: string;
				director: string;
				year: string;
				coverId: string;
			};

		prisma.movie.create({
			data: {
				title,
				description,
				director,
				year: parseInt(year),
				coverId: parseInt(coverId),
			},
		});
	},
	createGenre: async ({ request }: import('./$types').RequestEvent) => {
		const { name } = Object.fromEntries(await request.formData()) as {
			name: string;
		};

		prisma.genre.create({
			data: {
				name,
			},
		});
	},
	createMovieGenre: async ({ request }: import('./$types').RequestEvent) => {
		const { movieId, genreId } = Object.fromEntries(
			await request.formData()
		) as {
			movieId: string;
			genreId: string;
		};

		prisma.movieGenre.create({
			data: {
				movieId: parseInt(movieId),
				genreId: parseInt(genreId),
			},
		});
	},
	createCover: async ({ request }: import('./$types').RequestEvent) => {
		const { url, alt } = Object.fromEntries(await request.formData()) as {
			url: string;
			alt: string;
		};

		prisma.cover.create({
			data: {
				url,
				alt,
			},
		});
	},
};
;null as any as Actions;