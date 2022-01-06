import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  // https://dev.to/brojenuel/vite-vue-3-electron-5h4👌
  base: './',
  root: 'app',
  build: {
    outDir: resolve(__dirname, 'dist'),
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'app'),
    },
  },
});
