import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase, checkSupabaseConnection } from '../supabaseClient'; //
import Header from '../components/ui/Header'; //
import ProductCard from '../components/ui/ProductCard'; //
import ProductModal from '../components/ui/ProductModal'; //
import CartModal from '../components/ui/CartModal'; //
import Footer from '../components/ui/Footer'; //

// --- PASO 1: Importa tus hooks de contexto ---
// Estos son ejemplos, asegúrate de que las rutas y nombres coincidan con tu implementación.
// import { useCart } from '../contexts/CartContext'; // Hook para el carrito
// import { useFilters } from '../contexts/FilterContext'; // Hook para filtros y productos

// --- Simulación de hooks de contexto (PARA DESARROLLO HASTA QUE CREES LOS CONTEXTOS) ---
// Reemplaza esto con las importaciones reales cuando los contextos estén listos.
// Si ya tienes tus contextos, puedes eliminar esta simulación.

// Simulación para useCart
const useCart = () => {
  // Esta es una simulación. El estado del carrito y las funciones
  // vendrán de tu CartContext, que usará useLocalStorage.
  const [cartItems, setCartItemsState] = useState(() => {
    const localCart = localStorage.getItem('cartItems');
    return localCart ? JSON.parse(localCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCartContext = (product) => {
    if (product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }
    setCartItemsState(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.qty >= product.stock) {
          toast.error('Stock insuficiente');
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      toast.success('Producto agregado al carrito');
      return [...prevItems, { ...product, qty: 1 }];
    });
  };

  const updateCartItemQuantityContext = (productId, newQty) => {
    setCartItemsState(prevItems =>
      prevItems
        .map(item => (item.id === productId ? { ...item, qty: newQty } : item))
        .filter(item => item.qty > 0)
    );
  };

  const removeFromCartContext = (productId) => {
    setCartItemsState(prevItems => prevItems.filter(item => item.id !== productId));
    toast.info('Producto eliminado del carrito');
  };
  
  return { cartItems, addToCart: addToCartContext, updateCartItemQuantity: updateCartItemQuantityContext, removeFromCart: removeFromCartContext };
};

// Simulación para useFilters
const useFilters = () => {
  // Esta es una simulación. Estos estados y setters vendrán de tu FilterContext.
  const [categoriesGlobal] = useState(['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX']);
  const [selectedCatGlobal, setSelectedCatGlobal] = useState('INICIO');
  const [searchTermGlobal, setSearchTermGlobal] = useState('');
  const [priceRangeGlobal, setPriceRangeGlobal] = useState({ min: 0, max: 5000 });
  const [allBrandsGlobal, setAllBrandsGlobal] = useState([]); // Marcas disponibles
  const [selectedBrandGlobal, setSelectedBrandGlobal] = useState('');
  const [showOutOfStockGlobal, setShowOutOfStockGlobal] = useState(false);
  const [viewModeGlobal, setViewModeGlobal] = useState('grid');

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


function CatalogPage() {
  // --- PASO 2: Usa los hooks de contexto ---
  const { cartItems, addToCart, updateCartItemQuantity, removeFromCart } = useCart();
  const {
    categories, // Ahora viene del contexto (o puede seguir siendo estático aquí si prefieres)
    selectedCat, setSelectedCat,
    searchTerm, setSearchTerm,
    priceRange, setPriceRange,
    allBrands, setAllBrands, // Asumimos que setAllBrands viene del contexto para actualizarlo
    selectedBrand, setSelectedBrand,
    showOutOfStock, setShowOutOfStock,
    viewMode, setViewMode
  } = useFilters();

  // Estado local para productos y carga de la página
  const [allProducts, setAllProducts] = useState([]); // Todos los productos crudos de Supabase
  const [filteredDisplayProducts, setFilteredDisplayProducts] = useState([]); // Productos filtrados para mostrar
  const [pageLoading, setPageLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false); //
  
  // Estado local para UI específica de esta página
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setPageLoading(true);
        setConnectionError(false);

        const isConnected = await checkSupabaseConnection(); //
        if (!isConnected) {
          throw new Error('No se pudo conectar con la base de datos. Por favor, verifica tu conexión a internet.');
        }

        const { data, error } = await supabase
          .from('productos')
          .select('*'); //

        if (error) {
          console.error('Supabase error:', error);
          throw new Error('Error al obtener los productos: ' + error.message);
        }
        if (!data) {
          throw new Error('No se recibieron datos de la base de datos');
        }

        const processedProducts = data.map(product => ({ //
          ...product,
          imagen_url: product.imagen_url || 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen', //
          precio_normal: parseFloat(product.precio_normal) || 0, //
          promocion: product.promocion ? parseFloat(product.promocion) : null, //
          stock: parseInt(product.stock) || 0 //
        }));

        setAllProducts(processedProducts);

        // Extraer y establecer marcas disponibles (esto podría vivir en FilterContext si se prefiere)
        const uniqueBrands = [...new Set(processedProducts.map(p => p.marca).filter(Boolean))]; //
        if (setAllBrands) { // Verifica si setAllBrands está disponible (desde el hook simulado o real)
             setAllBrands(uniqueBrands.sort()); //
        }

      } catch (error) {
        console.error('Error fetching products:', error);
        setConnectionError(true); //
        toast.error(error.message || 'Error al cargar los productos. Por favor, intenta de nuevo más tarde.'); //
      } finally {
        setPageLoading(false);
      }
    }

    fetchProducts();
  }, [setAllBrands]); // setAllBrands como dependencia si viene del contexto

  useEffect(() => {
    let result = [...allProducts];
    
    if (!showOutOfStock) { // showOutOfStock ahora viene del contexto
      result = result.filter(p => p.stock > 0);
    }
    
    if (selectedCat !== 'INICIO') { // selectedCat ahora viene del contexto
      result = result.filter(p => p.categoria === selectedCat);
    }
    
    if (searchTerm) { // searchTerm ahora viene del contexto
      const search = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(search) ||
        p.descripcion?.toLowerCase().includes(search) ||
        p.categoria.toLowerCase().includes(search)
      );
    }

    if (priceRange) { // priceRange ahora viene del contexto
      result = result.filter(p => {
        const precio = p.promocion && p.promocion < p.precio_normal ? p.promocion : p.precio_normal;
        return precio >= priceRange.min && precio <= priceRange.max;
      });
    }

    if (selectedBrand) { // selectedBrand ahora viene del contexto
      result = result.filter(p => p.marca === selectedBrand);
    }
    
    setFilteredDisplayProducts(result);
  }, [selectedCat, searchTerm, priceRange, selectedBrand, allProducts, showOutOfStock]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768); //
    window.addEventListener('resize', handleResize); //
    return () => window.removeEventListener('resize', handleResize); //
  }, []);

  const formatCurrency = (amount) => { //
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (pageLoading) { //
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-900"></div>
      </div>
    );
  }

  if (connectionError) { //
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Error de Conexión</h2>
        <p className="text-gray-600 text-center mb-4">
          No se pudo establecer conexión con la base de datos. Por favor, verifica tu conexión a internet y recarga la página.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-luxury-900 text-white rounded hover:bg-luxury-800 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <>
      <Header
        categories={categories} // del (simulado) contexto
        selectedCategory={selectedCat} // del (simulado) contexto
        onCategorySelect={setSelectedCat} // del (simulado) contexto
        onSearch={setSearchTerm} // del (simulado) contexto
        onPriceRangeChange={setPriceRange} // del (simulado) contexto
        onBrandChange={setSelectedBrand} // del (simulado) contexto
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.qty, 0)} // del (simulado) contexto useCart
        onCartClick={() => setIsCartOpen(true)}
        isMobile={isMobile}
        brands={allBrands} // del (simulado) contexto
        showOutOfStock={showOutOfStock} // del (simulado) contexto
        onToggleOutOfStock={setShowOutOfStock} // del (simulado) contexto
        viewMode={viewMode} // del (simulado) contexto
        onViewModeChange={setViewMode} // del (simulado) contexto
      />

      <main className="max-w-8xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <AnimatePresence>
          {filteredDisplayProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-luxury-500">No se encontraron productos con los filtros actuales.</p>
            </motion.div>
          ) : (
            <div className={`${
              viewMode === 'list' 
                ? 'flex flex-col gap-4'
                : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'
            }`}>
              {filteredDisplayProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={() => setSelectedProductModal(product)}
                  onAddToCart={() => addToCart(product)} // addToCart ahora viene de useCart()
                  formatCurrency={formatCurrency}
                  viewMode={viewMode} // del (simulado) contexto
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {selectedProductModal && (
        <ProductModal
          product={selectedProductModal}
          onClose={() => setSelectedProductModal(null)}
          onAddToCart={() => addToCart(selectedProductModal)} // addToCart ahora viene de useCart()
          formatCurrency={formatCurrency}
        />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems} // cartItems ahora viene de useCart()
        onQuantityChange={updateCartItemQuantity} // updateCartItemQuantity ahora viene de useCart()
        onRemove={removeFromCart} // removeFromCart ahora viene de useCart()
        formatCurrency={formatCurrency}
      />
    </>
  );
}

export default CatalogPage;