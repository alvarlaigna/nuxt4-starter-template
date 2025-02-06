import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#00DC82',
          50: '#E6FFF4',
          100: '#CCFFE9',
          200: '#99FFD4',
          300: '#66FFBE',
          400: '#33FFA9',
          500: '#00FF93',
          600: '#00DC82',
          700: '#00A962',
          800: '#007641',
          900: '#004321',
          950: '#002A15'
        }
      }
    }
  },
  plugins: [],
} satisfies Config 