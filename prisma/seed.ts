import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";
import fs from "fs";

const prisma = new PrismaClient();

const loadMovie = async (csvrow: any) => {
	const movieData = {
		title: csvrow.title,
		overview: csvrow.overview,
		posterPath: csvrow.poster_path,
		runtime: +csvrow.runtime,
		budget: +csvrow.budget,
		revenue: +csvrow.revenue,
		releaseDate: new Date(csvrow.release_date),
		voteAverage: +csvrow.vote_average,
		voteCount: +csvrow.vote_count,
	};

	// Create the movies
	await prisma.movie.upsert({
		where: {
			id: +csvrow.id,
		},
		update: movieData,
		create: {
			id: +csvrow.id,
			...movieData,
		},
	});
};

const loadGenre = async (csvrow: any) => {
	// Replace single quotes with double quotes to make it valid JSON
	const genres = JSON.parse(csvrow.genres.replace(/'/g, '"'));

	for (const genre of genres) {
		// Create the genres
		await prisma.genre.upsert({
			where: {
				id: +genre.id,
			},
			update: {
				name: genre.name,
			},
			create: {
				id: +genre.id,
				name: genre.name,
			},
		});

		// Create the movie-genre relationships
		await prisma.movieGenre.upsert({
			where: {
				movieId_genreId: {
					movieId: +csvrow.id,
					genreId: +genre.id,
				},
			},
			update: {},
			create: {
				movieId: +csvrow.id,
				genreId: +genre.id,
			},
		});
	}
};

const loadCredit = async (csvrow: any) => {};

const seed = async () => {
	// Load the movies and genres
	fs.createReadStream("./prisma/src-data/movies_metadata.csv")
		.pipe(
			parse({
				relax_column_count: true,
				columns: true,
			})
		)
		.on("data", async csvrow => {
			loadMovie(csvrow).catch(err => {
				console.error(err);
			});

			loadGenre(csvrow).catch(err => {
				console.error(err);
			});
		})
		.on("end", () => {
			console.log("done");
		})
		.on("error", err => {
			console.error(err);
		});

	// Load the credits
	fs.createReadStream("./prisma/src-data/credits.csv")
		.pipe(
			parse({
				relax_column_count: true,
				columns: true,
			})
		)
		.on("data", async csvrow => {
			loadCredit(csvrow).catch(err => {
				console.error(err);
			});
		})
		.on("end", () => {
			console.log("done");
		})
		.on("error", err => {
			console.error(err);
		});
};

// Run the seed
seed()
	.catch(err => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
