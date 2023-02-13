import prisma from "$lib/server/prisma";
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
	createGenre: async ({ request }) => {
		try {
			// Get the form data from the request
			const { name } = Object.fromEntries(await request.formData()) as {
				name: string;
			};

			// Create the genre in the database
			await prisma.genre.create({
				data: {
					name,
				},
			});

			return {
				success: true,
			};
		} catch (error: any) {
			// Throw an error
			return fail(500, {
				message: "Could not create the genre.",
			});
		}
	},
};
