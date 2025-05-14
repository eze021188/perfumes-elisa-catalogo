    /** @type {import('tailwindcss').Config} */
    export default {
        content: [
          "./index.html", // Tu archivo HTML principal
          "./src/**/*.{js,jsx,ts,tsx}", // Todos los archivos JS/JSX/TS/TSX dentro de src/ y subcarpetas
        ],
        theme: {
          extend: {
            // Aquí puedes extender el tema por defecto de Tailwind (colores, fuentes, etc.)
          },
        },
        plugins: [
          // Aquí puedes añadir plugins de Tailwind si los necesitas
        ],
      }
      