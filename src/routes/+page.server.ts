import type { Actions } from "./$types";

export const actions: Actions = {
	createCover: async ({ request }) => {
		const { url, alt } = Object.fromEntries(await request.formData()) as {
			url: string;
			alt: string;
		};

		prisma.cover.create({
			data: {
				url,
				alt,
			},
		});
	},
	createMovie: async ({ request }) => {
		const { title, description, director, year, coverId } =
			Object.fromEntries(await request.formData()) as {
				title: string;
				description: string;
				director: string;
				year: string;
				coverId: string;
			};

		prisma.movie.create({
			data: {
				title,
				description,
				director,
				year: parseInt(year),
				coverId: parseInt(coverId),
			},
		});
	},
	createGenre: async ({ request }) => {
		const { name } = Object.fromEntries(await request.formData()) as {
			name: string;
		};

		prisma.genre.create({
			data: {
				name,
			},
		});
	},
	createMovieGenre: async ({ request }) => {
		const { movieId, genreId } = Object.fromEntries(
			await request.formData()
		) as {
			movieId: string;
			genreId: string;
		};

		prisma.movieGenre.create({
			data: {
				movieId: parseInt(movieId),
				genreId: parseInt(genreId),
			},
		});
	},
	createActor: async ({ request }) => {
		const { name } = Object.fromEntries(await request.formData()) as {
			name: string;
		};

		prisma.actor.create({
			data: {
				name,
			},
		});
	},
	createMovieActor: async ({ request }) => {
		const { movieId, actorId } = Object.fromEntries(
			await request.formData()
		) as {
			movieId: string;
			actorId: string;
		};

		prisma.movieActor.create({
			data: {
				movieId: parseInt(movieId),
				actorId: parseInt(actorId),
			},
		});
	},
	createDirector: async ({ request }) => {
		const { name } = Object.fromEntries(await request.formData()) as {
			name: string;
		};

		prisma.director.create({
			data: {
				name,
			},
		});
	},
	createMovieDirector: async ({ request }) => {
		const { movieId, directorId } = Object.fromEntries(
			await request.formData()
		) as {
			movieId: string;
			directorId: string;
		};

		prisma.movieDirector.create({
			data: {
				movieId: parseInt(movieId),
				directorId: parseInt(directorId),
			},
		});
	},
	createCrewMemeber: async ({ request }) => {
		const { name } = Object.fromEntries(await request.formData()) as {
			name: string;
		};

		prisma.crewMember.create({
			data: {
				name,
			},
		});
	},
	createMovieCrewMember: async ({ request }) => {
		const { movieId, crewMemberId } = Object.fromEntries(
			await request.formData()
		) as {
			movieId: string;
			crewMemberId: string;
		};

		prisma.movieCrewMember.create({
			data: {
				movieId: parseInt(movieId),
				crewMemberId: parseInt(crewMemberId),
			},
		});
	},
};
