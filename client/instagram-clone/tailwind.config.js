/** @type {import('tailwindcss').Config} */
export default {
	mode: "jit",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	// darkMode:'class',
	theme: {
		extend: {},
		minWidth: {
			"1/2": "50%",
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["light", "dark "],
	},
};
