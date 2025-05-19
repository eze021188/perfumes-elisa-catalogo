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
          50: '#f9f7f5',
          100: '#f3efeb',
          200: '#e8e2db',
          300: '#d5cabe',
          400: '#baa89a',
          500: '#a69280',
          600: '#8c7563',
          700: '#735f50',
          800: '#5f4e42',
          900: '#4d3f35',
          950: '#2b231e',
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