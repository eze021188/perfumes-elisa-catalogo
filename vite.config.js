import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Perfumes Elisa Catálogo',
        short_name: 'Perfumes Elisa',
        description: 'Catálogo de fragancias exclusivas',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'imagen/PERFUMESELISAblack.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'imagen/PERFUMESELISAblack.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
  build: {
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
});