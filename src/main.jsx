import { StrictMode } from 'react'; //
import { createRoot } from 'react-dom/client'; //
import { I18nextProvider } from 'react-i18next'; //
import './index.css'; //
import i18n from './i18n/config'; //
import App from './App.jsx'; //

// --- PASO 1: Importa tus Context Providers ---
// (Descomenta estas líneas y comenta/elimina la simulación cuando tus contextos estén listos)
// Asegúrate de que las rutas y nombres coincidan con tu implementación real.
// import { CartProvider } from './contexts/CartContext'; // Ejemplo de ruta
// import { FilterProvider } from './contexts/FilterContext'; // Ejemplo de ruta

// --- Simulación de Providers (PARA DESARROLLO HASTA QUE CREES LOS CONTEXTOS) ---
// Estos son placeholders. Deberás crear estos componentes Provider que contendrán
// la lógica de tus contextos (usando React.createContext, useState/useReducer, etc.).
const CartProvider = ({ children }) => {
  // En tu CartProvider real, aquí iría la lógica del contexto del carrito
  // incluyendo el uso de useLocalStorage.
  // console.log('CartProvider (simulado) renderizado');
  return <>{children}</>;
};

const FilterProvider = ({ children }) => {
  // En tu FilterProvider real, aquí iría la lógica del contexto de filtros.
  // console.log('FilterProvider (simulado) renderizado');
  return <>{children}</>;
};
// --- FIN DE SIMULACIÓN ---

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        {/* --- PASO 2: Envuelve App con tus providers --- */}
        {/* El orden de CartProvider y FilterProvider generalmente no importa
            a menos que un contexto dependa del otro (lo cual no es el caso aquí). */}
        <CartProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </CartProvider>
      </I18nextProvider>
    </StrictMode>,
  );
} else {
  console.error(
    "Error: El elemento raíz con id 'root' no fue encontrado en el DOM. " +
    "Asegúrate de que tu index.html contenga <div id=\"root\"></div>."
  );
}