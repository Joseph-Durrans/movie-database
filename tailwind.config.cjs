const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}", "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}"],
	theme: {
		container: {
			center: true,
			padding: "1rem",
		},
		extend: {},
	},
	plugins: [require("flowbite/plugin")],
	darkMode: "class",
};
