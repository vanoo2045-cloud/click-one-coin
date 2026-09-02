export default defineNuxtConfig({
  // Отключаем SSR — приложение будет работать полностью в браузере
  ssr: false, 

  vite: {
    server: {
      allowedHosts: ['.loca.lt']
    }
  },

  

  app: {
    baseURL: '/click-one-coin/',

    
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    preset: 'static',  // Генерируем статические файлы
    output: {
      dir: 'dist'  // Firebase Hosting ищет папку dist
    }
  },

  modules: ['@vite-pwa/nuxt'],

  pwa: {
    base: '/click-one-coin/',
    registerType: 'prompt',
    client: {
      registerPlugin: false
    },
    manifest: {
      name: 'Click One',
      short_name: 'Click One',
      description: 'Clicker game',
      theme_color: '#a855f7',
      background_color: '#a855f7',
      display: 'standalone',
      start_url: '/click-one-coin/',
      scope: '/click-one-coin/',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2,json}'],
      runtimeCaching: [
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 30
            }
          }
        },
        {
          urlPattern: /\.(?:woff|woff2|ttf|otf|eot)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365
            }
          }
        },
        {
          urlPattern: /^\/api\/.*/i,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 20,
              maxAgeSeconds: 60 * 60 * 24
            },
            networkTimeoutSeconds: 10
          }
        }
      ]
    }
  }
})
