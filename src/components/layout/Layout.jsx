import React, { useState, useEffect } from 'react'; // useState, useEffect son para la simulación de hooks
import Header from '../ui/Header'; //
import Footer from '../ui/Footer'; //

// --- PASO 1: Importa tus hooks de contexto ---
// (Descomenta estas líneas y comenta/elimina la simulación cuando tus contextos estén listos)
// import { useCart } from '../contexts/CartContext'; // Reemplaza con la ruta correcta
// import { useFilters } from '../contexts/FilterContext'; // Reemplaza con la ruta correcta

// --- Simulación de hooks de contexto (PARA DESARROLLO HASTA QUE CREES LOS CONTEXTOS) ---
// Reemplaza esto con las importaciones reales cuando los contextos estén listos.
const useCart = () => {
  const [cartItems, setCartItemsState] = useState(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    }
    return [];
  });
  // Simulación de la función para abrir el modal del carrito.
  // En una implementación real, esto podría cambiar un estado en CartContext.
  const openCartContext = () => {
    console.log('Simulación: Abrir modal del carrito globalmente');
    // Aquí tu CartContext podría cambiar un estado como `setIsCartModalOpen(true)`
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  return { cartItems, openCart: openCartContext };
};

const useFilters = () => {
  const [categoriesGlobal] = useState(['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX']); //
  const [selectedCatGlobal, setSelectedCatGlobal] = useState('INICIO');
  const [searchTermGlobal, setSearchTermGlobal] = useState('');
  const [priceRangeGlobal, setPriceRangeGlobal] = useState({ min: 0, max: 5000 });
  const [allBrandsGlobal, setAllBrandsGlobal] = useState([]);
  const [selectedBrandGlobal, setSelectedBrandGlobal] = useState('');
  const [showOutOfStockGlobal, setShowOutOfStockGlobal] = useState(false);
  const [viewModeGlobal, setViewModeGlobal] = useState('grid');
  
  // En un FilterContext real, las funciones set vendrían del contexto.
  // ej. const { selectedCat, setSelectedCat, ... } = useRealFilterContext();
  return {
    categories: categoriesGlobal,
    selectedCat: selectedCatGlobal, setSelectedCat: setSelectedCatGlobal,
    searchTerm: searchTermGlobal, setSearchTerm: setSearchTermGlobal,
    priceRange: priceRangeGlobal, setPriceRange: setPriceRangeGlobal,
    allBrands: allBrandsGlobal, setAllBrands: setAllBrandsGlobal, // Necesitarás un setter para las marcas
    selectedBrand: selectedBrandGlobal, setSelectedBrand: setSelectedBrandGlobal,
    showOutOfStock: showOutOfStockGlobal, setShowOutOfStock: setShowOutOfStockGlobal,
    viewMode: viewModeGlobal, setViewMode: setViewModeGlobal,
  };
};
// --- FIN DE SIMULACIÓN DE HOOKS ---

export default function Layout({ children }) {
  // --- PASO 2: Usa los hooks de contexto ---
  const { cartItems, openCart } = useCart(); // `openCart` debería cambiar un estado global para mostrar CartModal
  const {
    categories, // Lista de categorías (puede ser estática o del contexto)
    selectedCat, setSelectedCat,
    searchTerm, setSearchTerm, // Para el input de búsqueda en el Header
    priceRange, setPriceRange, // Para los filtros de precio en el Header
    allBrands, // Para el selector de marcas en el Header
    selectedBrand, setSelectedBrand,
    showOutOfStock, setShowOutOfStock, // Para el toggle de mostrar/ocultar agotados
    viewMode, setViewMode, // Para el selector de modo de vista (grid/list)
  } = useFilters();

  const cartItemsCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  // Función para manejar la selección de categoría
  // Podrías querer añadir lógica de navegación aquí si es necesario,
  // por ejemplo, si al seleccionar una categoría siempre se debe ir a la página de catálogo.
  const handleCategorySelect = (category) => {
    setSelectedCat(category);
    // Ejemplo: Si estás usando react-router-dom y quieres navegar:
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate(category === 'INICIO' ? '/' : `/catalogo?categoria=${encodeURIComponent(category)}`);
    // Por ahora, solo actualiza el estado global. La navegación se manejaría en el componente Header o CatalogPage.
  };
  
  // Función para manejar la búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    // Si el usuario busca desde una página que no es el catálogo,
    // podrías querer navegarlo al catálogo con el término de búsqueda.
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate(`/catalogo?search=${encodeURIComponent(term)}`);
  };


  return (
    <>
      <Header
        categories={categories}
        selectedCategory={selectedCat}
        onCategorySelect={handleCategorySelect} // Usa la función del contexto
        onSearch={handleSearch} // Usa la función del contexto
        
        // Props para filtros avanzados (si tu Header los maneja)
        // Estos deben venir de useFilters o ser manejados por funciones de useFilters
        onPriceRangeChange={setPriceRange}
        onBrandChange={setSelectedBrand}
        brands={allBrands}
        showOutOfStock={showOutOfStock}
        onToggleOutOfStock={setShowOutOfStock} // Esto pasará el nuevo valor directamente
        viewMode={viewMode}
        onViewModeChange={setViewMode}

        cartItemsCount={cartItemsCount} // Calculado desde el cartItems del contexto
        onCartClick={openCart} // Llama a la función del contexto para abrir el modal
      />
      {children}
      <Footer />
      {/* Nota: El <CartModal> en sí mismo probablemente NO se renderiza aquí.
        Se renderizaría a un nivel más alto (como en App.jsx) y su visibilidad
        sería controlada por un estado dentro de tu CartContext (manejado por openCart/closeCart).
      */}
    </>
  );
}