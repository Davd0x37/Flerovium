// const colors = {
// 	primary: '#D8DDBF', // background with dark text - text-secondary, bg-primary
// 	secondary: '#2F4A55', // text with light background - text-primary, bg-secondary
// 	accent: {
// 		light: '#EA9759',
// 		dark: '#237F6A',
// 	},
// 	brand: '#6FAF49',
// 	info: '#2f4a55',
// 	success: '#57af4e',
// 	warning: '#d49f16',
// 	danger: '#f44336',
// 	default: '#999999',

// 	// primary: '#F8F8F8', // background with dark text - text-secondary, bg-primary
// 	// secondary: '#234275', // text with light background - text-primary, bg-secondary
// 	// accent: {
// 	// 	light: '#57A7D8',
// 	// 	dark: '#B26EBB',
// 	// },
// 	// brand: '#E7376F',
// 	// info: '#234275',
// 	// success: '#7b8b59',
// 	// warning: '#f87b21',
// 	// danger: '#f44336',
// 	// default: '#999999',
// };

const colors = {
	primary: {
		light: '#F8F8F8',
		DEFAULT: '#D8DDBF',
	}, // background with dark text - text-secondary, bg-primary
	secondary: '#2F4A55', // text with light background - text-primary, bg-secondary
	accent: {
		light: '#EA9759',
		dark: '#237F6A',
	},
	brand: '#6FAF49',
	info: '#2f4a55',
	success: '#57af4e',
	warning: '#d49f16',
	danger: '#f44336',
	default: '#999999',
};

module.exports = {
	mode: 'jit',
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			gridTemplateColumns: {
				header: '100px minmax(200px, 1fr) minmax(300px, 1fr) minmax(200px, 1fr)',
			},
		},
		fontFamily: {
			display: ['Roboto', 'sans-serif'],
		},

		backgroundColor: (theme) => ({
			...theme('colors'),
			...colors,
		}),

		textColor: (theme) => ({
			...theme('colors'),
			...colors,
		}),

		borderColor: (theme) => ({
			...theme('colors'),
			...colors,
		}),

		placeholderColor: (theme) => ({
			...theme('colors'),
			...colors,
		}),
	},
	variants: {
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
