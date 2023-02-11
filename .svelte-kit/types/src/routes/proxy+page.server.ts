// @ts-nocheck
// import { getMovies } from "$lib/server/tmdb";
import type { Actions } from "./$types";

// export const load: PageServerLoad = async () => {
// 	const movies = await getMovies();

// 	return {
// 		movies: movies.results,
// 	};
// };

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
	},
};
;null as any as Actions;