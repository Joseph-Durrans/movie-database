import prisma from "$lib/server/prisma";
import type { Cover } from "@prisma/client";
import { writeFileSync } from "fs";
import type { Actions } from "./$types";

export const actions: Actions = {
	createCover: async ({ request }) => {
		try {
			// Get the form data from the request
			const { name, alt, base64 } = Object.fromEntries(
				await request.formData()
			) as {
				name: string;
				alt: string;
				base64: string;
			};

			// Create the full url
			let url = `uploads/${name}`;

			// Check if the cover already exists
			let duplicates: Cover | null;
			let duplicateCount = 0;

			do {
				duplicates = await prisma.cover.findUnique({
					where: {
						url,
					},
				});

				if (duplicates) {
					url = `uploads/${name} (${++duplicateCount})`;
				}
			} while (duplicates);

			// Remove the base64 string header
			const base64WithoutHeader = base64.split(",")[1];

			// Write the file to the uploads folder
			writeFileSync(`static/${url}`, base64WithoutHeader, "base64");

			// Create the cover in the database
			await prisma.cover.create({
				data: {
					url,
					alt,
				},
			});
		} catch (error: any) {
			// Throw an error
			throw error(500, {
				message: "Could not create the cover.",
			});
		}
	},
};
