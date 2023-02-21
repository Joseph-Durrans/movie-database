import { PrismaClient } from "@prisma/client";
import fs from "fs";
import * as readline from "readline";

const prisma = new PrismaClient();

const seed = async () => {
	let movieIDs: JSON[] = [];

	const readInterface = readline.createInterface({
		input: fs.createReadStream("./prisma/movies.json"),
	});

	readInterface.on("line", line => {
		createMovie(JSON.parse(line).id);
	});
};

const fetchRetry = async (
	url: string,
	n: number,
	options?: any
): Promise<Response> => {
	try {
		return await fetch(url, options);
	} catch (err) {
		if (n === 1) throw err;
		return await fetchRetry(url, options, n - 1);
	}
};

const createMovie = async (id: number) => {
	try {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.SECRET_TMDB_API_KEY}`
		);

		const movie = await res.json();

		const {
			original_title,
			release_date,
			runtime,
			overview,
			budget,
			revenue,
			poster_path,
		} = movie;

		await prisma.movie.create({
			data: {
				id,
				title: original_title,
				releaseDate: new Date(release_date),
				runtime,
				overview,
				budget,
				revenue,
				cover: poster_path,
			},
		});
	} catch (e) {
		console.error(e);
	}
};

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
