import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import postcss from './postcss.config'
import { manifest } from './src/configs/manifest.js'

export default defineConfig({
  plugins: [react(), VitePWA(manifest)],
  css: {
    postcss,
  },
  server: {
    port: 3001,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
  },
})
