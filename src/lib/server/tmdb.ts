// import { SECRET_TMDB_API_KEY } from "$env/static/private";
// import { fail } from "@sveltejs/kit";

// const getMovies = async () => {
// 	try {
// 		const res = await fetch(
// 			`https://api.themoviedb.org/3/discover/movie?api_key=${SECRET_TMDB_API_KEY}`,
// 			{
// 				method: "GET",
// 			}
// 		);

// 		return res.json();
// 	} catch (error) {
// 		return fail(500, { message: "Could not fetch movies from the API." });
// 	}
// };

// export { getMovies };
