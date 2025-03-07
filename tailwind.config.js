import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
	important: true,
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		colors: {
			...colors,
			dark: '#1a1f37',
			'dark-gray': '#6c737f',
			'custom-red': '#f55151',
		},
		extend: {},
	},
	plugins: [],
};
