import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage'; // Importa la página del catálogo
// Importa otros componentes o páginas si los tienes

function App() {
  return (
    <Router>
      <Routes>
        {/* Define la ruta para la página del catálogo */}
        <Route path="/" element={<CatalogPage />} />

        {/* Define otras rutas si las necesitas (ej: una página de "Mi Solicitud") */}
        {/* <Route path="/solicitud" element={<RequestPage />} /> */}

        {/* Puedes añadir una ruta 404 si quieres */}
        {/* <Route path="*" element={<div>Página no encontrada</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
