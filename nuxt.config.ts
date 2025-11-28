import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: '.',

  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/tailwind.css'
  ],

  app: {
    head: {
      title: 'Etsy Clone | Nuxt 4',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Etsy style marketplace UI built with Nuxt 4, Vue 3, Tailwind, Pinia and Motion.' }
      ]
    }
  },

  compatibilityDate: '2024-11-01',

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  typescript: {
    strict: false
  },

  // 👇 Medusa credentials for client + server
  runtimeConfig: {
    public: {
      medusaUrl: process.env.NUXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000',
      medusaPublishableKey: process.env.NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || 'pk_6f3eb832efbfd19f1efbdb73cfb7c9b1e63ff85cded0bf58021a4440cdecb8b9',
      medusaAdminKey: process.env.NUXT_PUBLIC_MEDUSA_ADMIN_KEY || 'sk_ee51a4b956d9fa3baf531d0aa1818a3bbba99c895c9af4dc822b9142f4063eb9',
      appName: 'Etsy Clone'
    }
  },

  nitro: {
    preset: 'node-server'
  }
})
