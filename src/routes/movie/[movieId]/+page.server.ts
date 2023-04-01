import prisma from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const movieData = async (movieId: number) => {
	const movie = await prisma.movie.findUnique({
		where: {
			id: movieId,
		},
	});

	if (movie) {
		return movie;
	}

	throw error(404, "Movie Not found");
};

const load: PageServerLoad = async ({ params }: any) => {
	const { movieId } = params;

	const movie = await prisma.movie.findUnique({
		where: {
			id: +movieId,
		},
	});

	if (movie) {
		return movie;
	}

	throw error(404, "Movie Not found");
};

export { load };
