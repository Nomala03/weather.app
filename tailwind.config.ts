import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      screens: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // 👈 add this
      },
    },
  },
  plugins: [],
} satisfies Config
