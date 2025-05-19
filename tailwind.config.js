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
        product: ['"Segoe UI"', 'Arial', 'Helvetica', 'sans-serif'],
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'luxury-pattern': "url('/patterns/luxury-pattern.svg')",
      },
      boxShadow: {
        'luxury': '0 4px 20px -2px rgba(67, 61, 54, 0.1)',
        'luxury-hover': '0 8px 30px -4px rgba(67, 61, 54, 0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}