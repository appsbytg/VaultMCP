import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

// `npm run build`        -> dist/ for GitHub Pages, served from /vaultmcp/ (must match the repo name)
// `npm run build:single` -> one self-contained dist-single/index.html
export default defineConfig(({ mode }) => ({
  base: mode === 'single' ? './' : '/vaultmcp/',

  plugins: mode === 'single'
    ? [react(), viteSingleFile()]
    : [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: mode === 'single'
    ? { outDir: 'dist-single', emptyOutDir: true }
    : undefined,
}))
