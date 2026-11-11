import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath, URL } from 'node:url'

// `npm run build` -> normal static site in dist/ (served at /).
// `npm run build:single` -> one self-contained dist-single/index.html (CSS + JS inlined).
export default defineConfig(({ mode }) => ({
  plugins: mode === 'single' ? [react(), viteSingleFile()] : [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: mode === 'single' ? { outDir: 'dist-single', emptyOutDir: true } : undefined,
}))
