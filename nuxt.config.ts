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
  runtimeConfig: {
    public: {
      appName: 'Etsy Clone'
    }
  },
  nitro: {
    preset: 'node-server'
  }
})
