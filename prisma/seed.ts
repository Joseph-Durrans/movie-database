import { PrismaClient } from "@prisma/client";
import { parse } from "csv-parse";
import fs from "fs";
import JSON5 from "json5";

const prisma = new PrismaClient();

const parseInvalidJSON = (json: string) => {
	const pattern = new RegExp(/\'?\(?(?<![A-Z])None(?![A-Z])\)?\'?/, "gi");
	return JSON5.parse(json.replace(pattern, "' '"));
};

const loadCredit = async (csvrow: any) => {
	const crew = parseInvalidJSON(csvrow.crew);
	const cast = parseInvalidJSON(csvrow.cast);

	const createPerson = async (person: any) => {
		// Create the people
		await prisma.person.upsert({
			where: {
				id: +person.id,
			},
			update: {
				name: person.name,
			},
			create: {
				id: +person.id,
				name: person.name,
			},
		});
	};

	for (const person of cast) {
		// Create the people
		await createPerson(person);
		// Create the cast
		await prisma.cast.upsert({
			where: {
				id: person.credit_id,
			},
			update: {
				character: person.character,
			},
			create: {
				id: person.credit_id,
				movieId: +csvrow.id,
				personId: +person.id,
				character: person.character,
			},
		});
	}

	for (const person of crew) {
		// Create the people
		await createPerson(person);
		// Create the crew
		await prisma.crew.upsert({
			where: {
				id: person.credit_id,
			},
			update: {
				job: person.job,
			},
			create: {
				id: person.credit_id,
				movieId: +csvrow.id,
				personId: +person.id,
				job: person.job,
			},
		});
	}
};

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
	const genres = parseInvalidJSON(csvrow.genres);

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
				console.error("[Error Loading Movie]:", err);
			});

			loadGenre(csvrow).catch(err => {
				console.error("[Error Loading Genre]:", err);
			});
		})
		.on("end", () => {
			console.log("Created Movies And Genres");
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
				console.error("[Error Loading Credit]:", err);
			});
		})
		.on("end", () => {
			console.log("Created Credits");
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
