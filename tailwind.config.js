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
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        luxury: {
          50: '#f8f7f4',
          100: '#e8e6e1',
          200: '#d3cfc5',
          300: '#b7b0a5',
          400: '#998f81',
          500: '#827868',
          600: '#6d6354',
          700: '#5b5246',
          800: '#4d463d',
          900: '#433d36',
          950: '#2a261f',
        },
        accent: {
          DEFAULT: '#c8a97e',
          light: '#d4bc99',
          dark: '#b39164',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-pattern': "url('/patterns/luxury-pattern.svg')",
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(200, 169, 126, 0.25)',
        'luxury-hover': '0 8px 30px -4px rgba(200, 169, 126, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}