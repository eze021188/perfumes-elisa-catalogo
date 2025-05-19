import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Toast from './components/ui/Toast';
import Loading from './components/ui/Loading';

const CatalogPage = React.lazy(() => import('./pages/CatalogPage'));

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
        </Routes>
      </Suspense>

      <Toast />
    </Router>
  );
}

export default App;