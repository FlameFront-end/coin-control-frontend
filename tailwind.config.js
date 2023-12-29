/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	theme: {
		container: {
			padding: '2rem',
			center: true
		},
		extend: {
			fontFamily: ['Roboto', 'sans-serif']
		}
	},
	plugins: [require('@tailwindcss/forms')]
}
