/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'ui-sans-serif', 'sans-serif']
      },
      colors: {
        brand: {
          DEFAULT: '#F1641E',
          soft: '#FEF0E8',
          dark: '#C24E17'
        }
      },
      boxShadow: {
        soft: '0 18px 35px rgba(15, 23, 42, 0.12)'
      }
    }
  },
  plugins: []
}
