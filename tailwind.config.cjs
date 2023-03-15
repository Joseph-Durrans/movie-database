const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		fontFamily: {
			mono: ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
		},
		extend: {},
		screens: {
			'sm': '420px',
			// => @media (min-width: 420px) { ... }
		
			'md': '830px',
			// => @media (min-width: 830px) { ... }
	
			'lg': '1025px',
			// => @media (min-width: 1024px) { ... }
		
			'xl': '1360px',
			// => @media (min-width: 1280px) { ... }
		
			'2xl': '1500px',
			// => @media (min-width: 1600px) { ... }
		},
		colors: {
				'black': '#000000',
				'gray': '#EBEBEB',
				'gray-light': '#F7F7F7',
				'white': '#FFFFFF',
				'purple': "#292359",
				'purple-2': "#282356",
				'purple-light': "#474088",
				"dark-purple": "#14122B",
				"faint-purple": '#e0e1eb',
				"fainter-purple": '#f0f0f5',
				"red": "#E73137",
				"dark-red": "#DD1728",
				"light-red": "#F07777",
				"strong-red": "#F10017",
				"yellow": "#E7A831",
				"light-blue": "#6A81E2",
				"blue": "#0047ab"
	
			},
			extend: {
				padding: {
					// eg 'bottom-xsm': "20px",
					'default': '25px'
				},
				borderRadius: {
					// eg '4xl': '2rem',
					"default": '10px'
				}
			},
			fontSize: {
				'xxl': '100px',
				'xl': '70px',
				'l': '50px',
				'md-large': '40px',
				'35': '35px',
				'30': '30px',
				'md': '25px',
				'24': '24px',
				'20': '20px',
				'md-sm': '18px',
				'18': '18px',
				'17': '17px',
				'16': '16px',
				'sm': '15px',
				'xsm': '14px',
				'2xsm': '13px',
			},
	},
	plugins: [],
};
