/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['Cormorant', 'Georgia', 'serif'],
      },
      colors: {
        luxury: {
          50: '#ffffff',
          100: '#faf9f7',
          200: '#f3f1ed',
          300: '#e8e4dd',
          400: '#d5cec4',
          500: '#beb5a8',
          600: '#a69c8d',
          700: '#8c8275',
          800: '#6b635a',
          900: '#4a443d',
          950: '#2a2723',
        },
        accent: {
          DEFAULT: '#8c7355',
          light: '#a08b70',
          dark: '#725c44',
        },
      },
    },
  },
  plugins: [],
}