module.exports = {
	tabWidth: 2,
	useTabs: true,
	arrowParens: "avoid",
	printWidth: 200,
	plugins: ["prettier-plugin-tailwindcss"],
	pluginSearchDirs: ["."],
	overrides: [
		{
			files: "*.svelte",
			options: { parser: "svelte" },
		},
	],
};
