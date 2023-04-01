import prisma from "$lib/server/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

interface OffsetPaginationProps {
	pageId?: number;
	count?: number;
}

const offsetPagination = async ({ pageId = 0, count = 12 }: OffsetPaginationProps) => {
	const movies = await prisma.movie.findMany({
		take: count,
		skip: pageId * count,
		orderBy: {
			id: "asc",
		},
	});

	if (movies || movies.length > 0) {
		return {
			movies,
			pageId,
			pageCount: Math.floor((await prisma.movie.count()) / count),
		};
	}
};

const load: PageServerLoad = async ({ params }: any) => {
	const { pageId } = params;
	console.log("pageId", pageId);

	const pagination = await offsetPagination({ pageId: +pageId });

	if (pagination) {
		return pagination;
	}

	throw error(404, "Page Not found");
};

export { load };
