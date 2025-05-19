import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Toast from './components/ui/Toast';
import Loading from './components/ui/Loading';
import WhatsAppButton from './components/ui/WhatsAppButton';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage'));
const ComoAplicarPage = React.lazy(() => import('./pages/ComoAplicarPage'));
const PreguntasFraganciasPage = React.lazy(() => import('./pages/PreguntasFraganciasPage'));

function App() {
  return (
    <Router>
      <Helmet>
        <title>Perfumes Elisa Catálogo</title>
        <meta name="description" content="Descubre nuestra exclusiva colección de fragancias para dama y caballero" />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/como-aplicar" element={<ComoAplicarPage />} />
          <Route path="/preguntas-fragancias" element={<PreguntasFraganciasPage />} />
        </Routes>
      </Suspense>

      <WhatsAppButton />
      <Toast />
    </Router>
  );
}

export default App;