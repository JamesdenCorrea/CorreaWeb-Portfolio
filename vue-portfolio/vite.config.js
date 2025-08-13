import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Use relative paths for deployment (Render or any static host)
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
