import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// No necesitas importar tailwindcss o autoprefixer aquí si usas postcss.config.js

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Plugin de React
    // Si tienes postcss.config.js en la raíz, Vite lo usará automáticamente.
    // No necesitas una sección 'postcss' aquí.
  ],
  // Elimina la sección 'css.postcss' si existe:
  // css: {
  //   postcss: {
  //     plugins: [
  //       // ... configuración de plugins ...
  //     ],
  //   },
  // },
});
