import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import postcss from './postcss.config'

export default defineConfig({
  plugins: [react()],
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
