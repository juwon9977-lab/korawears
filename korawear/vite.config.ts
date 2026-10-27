import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// The build is inlined into one index.html, so it also opens by double-click (file://).
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
})
