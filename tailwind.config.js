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
			'gradient-red':
				'linear-gradient(310deg, rgb(245, 60, 43), rgb(245, 60, 43))',
		},
		extend: {},
	},
	plugins: [],
};
