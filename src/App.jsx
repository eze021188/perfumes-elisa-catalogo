import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CatalogPage from './pages/CatalogPage';
import SEOHead from './components/SEOHead';

function App() {
  return (
    <Router>
      <SEOHead 
        title="Catálogo de Fragancias"
        description="Descubre nuestra exclusiva colección de fragancias para dama y caballero"
        url="https://perfumeselisa.com"
      />
      <Routes>
        <Route path="/" element={<CatalogPage />} />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
}

export default App;