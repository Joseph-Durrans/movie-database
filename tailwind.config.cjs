const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
		},
		extend: {},
	},
	plugins: [],
};
