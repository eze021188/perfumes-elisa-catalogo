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
          50: '#ffffff',
          100: '#f8f7f4',
          200: '#e8e2db',
          300: '#d5cabe',
          400: '#baa89a',
          500: '#a69280',
          600: '#8c7563',
          700: '#735f50',
          800: '#433d36',
          900: '#2b231e',
          950: '#1a1614',
        },
        accent: {
          DEFAULT: '#9d7553',
          light: '#b89778',
          dark: '#7d5d42',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-pattern': "url('/patterns/luxury-pattern.svg')",
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(67, 61, 54, 0.15)',
        'luxury-hover': '0 8px 30px -4px rgba(67, 61, 54, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}