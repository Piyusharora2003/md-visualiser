import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'vite.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png', 'pwa-maskable-192x192.png'],
      manifest: {
        name: 'Markdown Workspace',
        short_name: 'MD Workspace',
        description: 'Premium Offline-first Markdown Previewer',
        theme_color: '#0f1115',
        background_color: '#0f1115',
        display: 'standalone',
        start_url: '/',
        id: '/',
        // IMPORTANT: 'any' and 'maskable' must be SEPARATE entries for Android Chrome
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'pwa-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: 'pwa-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      }
    })
  ],
})

