import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	base: '/',
	root: './src',
	plugins: [vue()],
	build: {
		outDir: '../../../build/client',
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	// optimizeDeps: {
	// 	exclude: ["line-awesome"]
	// }
	// server: {
	// 	hmr: {
	// 		protocol: 'ws',
	// 		host: 'localhost',
	// 	},
	// },
});
