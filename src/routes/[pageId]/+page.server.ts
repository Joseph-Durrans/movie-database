import prisma from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface CursorPaginationProps {
	direction?: "next" | "prev";
	cursor?: number;
	count?: number;
}

const cursorPagination = async ({ direction = "next", cursor = 0, count = 12 }: CursorPaginationProps) => {
	const movies = await prisma.movie.findMany({
		take: direction == "next" ? count : -count,
		skip: 1,
		cursor: {
			id: cursor,
		},
		orderBy: {
			id: "asc",
		},
	});

	if (movies) {
		return {
			movies,
			pageCount: (await prisma.movie.count()) / count,
		};
	}

	throw error(404, "Not found");
};

const load: PageServerLoad = async ({ params }: any) => {
	const firstMovie = await prisma.movie.findFirst({
		orderBy: {
			id: "asc",
		},
	});

	if (firstMovie) {
		return {
			movies: await cursorPagination({ direction: "next", cursor: firstMovie.id, count: 15 }),
		};
	}

	throw error(404, "Not found");
};

export { load };
