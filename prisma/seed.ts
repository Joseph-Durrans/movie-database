import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";
import fs from "fs";

const prisma = new PrismaClient();

const seed = async () => {
	/*
        Creates the movies
        Data set will need to be cleaned up before seeding
        Remove any overflowing lines
	*/

	fs.createReadStream("./prisma/src-data/movies_metadata.csv")
		.pipe(
			parse({
				relax_column_count: true,
				columns: true,
			})
		)
		.on("data", async csvrow => {
			try {
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
			} catch (err) {
				console.error(err);
			}
		})
		.on("end", () => {
			console.log("done");
		})
		.on("error", err => {
			console.error(err);
		});
};

seed()
	.catch(err => {
		console.error(err);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
