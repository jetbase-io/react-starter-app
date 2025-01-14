import type { VitePWAOptions } from 'vite-plugin-pwa'

export const manifest: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    short_name: 'React App',
    name: 'Create React App Sample',
    icons: [
      {
        src: 'favicon.ico',
        sizes: '64x64',
        type: 'image/x-icon',
      },
    ],
    start_url: '/',
    display: 'standalone',
    theme_color: '#000000',
    background_color: '#ffffff',
  },
}
