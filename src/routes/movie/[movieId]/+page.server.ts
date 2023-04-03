import prisma from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const movieData = async (movieId: number) => {
	const movie = await prisma.movie
		.findUnique({
			where: {
				id: movieId,
			},
			include: {
				movieGenre: {
					include: {
						genre: true,
					},
				},
				cast: {
					include: {
						person: true,
					},
				},
				crew: {
					include: {
						person: true,
					},
				},
			},
		})
		.catch(() => {
			throw error(404, "Movie Not found");
		});

	return {
		movie,
	};
};

const load: PageServerLoad = async ({ params }: any) => {
	const { movieId } = params;

	return await movieData(+movieId).catch(() => {
		throw error(404, "Movie Not found");
	});
};

export { load };
