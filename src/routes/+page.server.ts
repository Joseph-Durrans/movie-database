import prisma from "$lib/server/prisma";
import type { MovieWhereInput } from "@prisma/client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface OffsetPaginationProps {
	page?: number;
	count?: number;
	filters?: MovieWhereInput;
}

const offsetPagination = async ({ page = 0, count = 12, filters = null }: OffsetPaginationProps) => {
	page -= 1;

	const movies = await prisma.movie.findMany({
		take: count,
		skip: page * count,
		orderBy: {
			id: "asc",
		},
		...filters,
	});

	return movies;
};

const load: PageServerLoad = async ({ url }) => {
	const { searchParams } = url;

	const page = searchParams.get("page") || 1;
	const count = searchParams.get("count") || 12;
	const genre = searchParams.get("genre");

	const filters: MovieWhereInput = {
		where: {
			movieGenre: {
				some: {
					genreId: genre ? +genre : undefined,
				},
			},
		},
	};

	const pageCount = Math.floor((await prisma.movie.count(filters)) / +count);

	if (+page > pageCount) {
		throw error(404, "Page Not found");
	}

	const movies = await offsetPagination({ page: +page, count: +count, filters }).catch(() => {
		throw error(404, "Page Not found");
	});

	const genres = await prisma.genre.findMany();

	return {
		movies,
		page: +page,
		genre: genre ? +genre : undefined,
		pageCount,
		genres,
	};
};

export { load };
