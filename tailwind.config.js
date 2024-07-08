/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		fontFamily: {
			sans: [
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'Segoe UI',
				'Roboto',
				'Oxygen',
				'Ubuntu',
				'Cantarell',
				'Open Sans',
				'Helvetica Neue',
				'sans-serif',
			],
		},
		container: {
			center: true,
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
			padding: {
				DEFAULT: '1rem',
				sm: '0',
				md: '1rem',
				lg: '0',
				xl: '0',
			},
		},
		extend: {
			colors: {
				'primary-color-dark-500': 'rgba(51, 51, 51, 1)',
				'primary-color-dark-900': 'rgba(9, 9, 9, 1)',
				'primary-color-500': 'rgba(181, 103, 249, 1)',
				'primary-color-900': 'rgba(133, 25, 228, 1)',
				'bg-main': 'rgba(255, 255, 255, 1)',
				'bg-main-dark': 'rgba(75, 75, 75, 1)',
				'text-white': 'rgba(255, 255, 255, 1)',
			},
			boxShadow: {
				basic: '0px 0px 5px rgba(29, 29, 29, 1)',
			},
			backgroundImage: {
				'geolocation-btn': "url('/icons/static/geo.svg')",
				'search-btn': "url('/icons/static/search.svg')",
				'close-btn': "url('/icons/static/close.svg')",
				'burger-btn': "url('/icons/static/burger.svg')",
				'left-arrow-btn': "url('/icons/static/arr_left.svg')",
				'right-arrow-btn': "url('/icons/static/arr_right.svg')",
				'up-arrow-btn': "url('/icons/static/arr_up.svg')",
				'down-arrow-btn': "url('/icons/static/arr_down.svg')",
				'trash-btn': "url('/icons/static/trash.svg')",
				'edit-btn': "url('/icons/static/edit.svg')",
				'add-btn': "url('/icons/static/add.svg')",
				'celsius-icon': "url('/icons/static/celsius.svg')",
				'fahrenheit-icon': "url('/icons/static/fahrenheit.svg')",
			},
			backgroundSize: {
				'geolocation-btn': '20px 20px',
				'search-btn': '20px 20px',
				'up-arrow-btn': '20px 20px contain',
			},
			backgroundRepeat: {
				'up-arrow-btn': 'no-repeat',
			},
			textColor: {
				dark: 'rgba(51, 51, 51, 1)',
				light: 'rgba(255, 255, 255, 1)',
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.scrollbar-hidden': {
					scrollbarWidth: 'none',
					scrollbarColor: 'transparent transparent',
				},
				'.scrollbar-hidden-webkit': {
					'&::-webkit-scrollbar': {
						width: '0px',
					},
					'&::-webkit-scrollbar-track': {
						background: 'transparent',
					},
				},
				'.input-search-no-clear::-webkit-search-cancel-button': {
					'-webkit-appearance': 'none',
					appearance: 'none',
				},
			});
		},
		function ({ addVariant }) {
			addVariant('hocus', ['&:hover', '&:focus']);
		},
	],
};
