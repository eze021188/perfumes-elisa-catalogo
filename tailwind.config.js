/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        gold: {
          50: '#fbf7ed',
          100: '#f5e6c3',
          200: '#e9c87c',
          300: '#dea94c',
          400: '#d49024',
          500: '#bd7b19',
          600: '#a66414',
          700: '#8c4d12',
          800: '#723b13',
          900: '#5c2f12',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}