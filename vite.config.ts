import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Weather',
        short_name: 'Weather',
        theme_color: '#0ea5e9',
        background_color: '#0b1320',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            // Open‑Meteo forecast + warnings
            urlPattern: ({ url }) => url.hostname.endsWith('open-meteo.com'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'openmeteo-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 }, // 1h
            },
          },
          {
            // Open‑Meteo geocoding
            urlPattern: ({ url }) => url.hostname.includes('geocoding-api.open-meteo.com'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'geocode-cache',
              expiration: { maxEntries: 60, maxAgeSeconds: 24 * 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
})
