import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  root: './app',
  plugins: [vue()],
  build: {
    outDir: '../build',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app'),
    },
  },
});
