// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	workspaceRoot: '../',
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
		// '../../node_modules/line-awesome/dist/line-awesome/fonts': { url: '/fonts' },
		// '../../node_modules/@fontsource/roboto/files': { url: '/files' },
		// @FIXME: FIX THIS
		// '../../node_modules/jsoneditor/dist/img': { url: '/img' },
	},
	plugins: [
		'@snowpack/plugin-vue',
		'@snowpack/plugin-postcss',
		'@snowpack/plugin-dotenv',
	],
	routes: [
		/* Enable an SPA Fallback in development: */
		{"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		// bundle: true,
	},
	packageOptions: {
		knownEntrypoints: ['@esm-bundle/chai'],
		// source: 'remote',
	},
	devOptions: {
		tailwindConfig: './tailwind.config.js',
		open: 'none',
		port: 3000
	},
	buildOptions: {
		out: './build/client',
		baseUrl: '/',
	},
	alias: {
		'@': './src',
	},
};
