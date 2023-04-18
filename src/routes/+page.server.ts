import prisma from "$lib/server/prisma";
import { MovieWhereInput } from "@prisma/client";
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
	const year = searchParams.get("year") || null;
	const genresParam = searchParams.getAll("genres[]");
	// const director = searchParams.get("director");
	const search = searchParams.get("search");

	const filters: MovieWhereInput = {
		where: {
			AND: [],
		},
	};

	// genre filter
	for (const genre of genresParam) {
		filters.where.AND.push({
			movieGenre: {
				some: {
					genreId: +genre,
				},
			},
		});
	}

	// year filter
	if (year) {
		filters.where.AND.push({
			releaseDate: {
				gte: new Date(`${year}-01-01`),
				lt: new Date(`${+year + 1}-01-01`),
			},
		});
	}

	// if (director) {
	// 	filters.where.AND.push({
	// 		crew: {
	// 			some: {
	// 				personId: +director,
	// 			},
	// 		},
	// 	});
	// }

	//search filter
	if (search) {
		filters.where.AND.push({
			OR: [
				{
					crew: {
						some: {
							person: {
								name: {
									search: search.split(" ").join(" <-> "),
								},
							},
						},
					},
				},
				{
					cast: {
						some: {
							person: {
								name: {
									search: search.split(" ").join(" <-> "),
								},
							},
						},
					},
				},
				{
					title: {
						search: search.split(" ").join(" <-> "),
					},
				},
				{
					overview: {
						search: search.split(" ").join(" <-> "),
					},
				},
			],
		});
	}

	const pageCount = Math.floor((await prisma.movie.count(filters)) / +count);

	const movies = await offsetPagination({ page: +page, count: +count, filters }).catch(e => {
		throw error(404, e);
	});

	const genres = await prisma.genre.findMany();
	const years = () => {
		const years = [];

		for (let i = 2018; i >= 1887; i--) {
			years.push(i);
		}

		return years;
	};

	const directors = await prisma.crew.findMany({
		distinct: ["personId"],
		where: {
			job: "Director",
		},
		include: {
			person: true,
		},
	});

	return {
		movies,
		page: +page,
		pageCount,
		genres,
		years: years(),
		directors,
	};
};

export { load };
