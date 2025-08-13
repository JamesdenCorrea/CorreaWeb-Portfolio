import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Set base path for Render deployment
  base: '/', 
  build: {
    // optional: to ensure assets work correctly
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
