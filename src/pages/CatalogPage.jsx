import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';
import Header from '../components/ui/Header';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import CartModal from '../components/ui/CartModal';
import Footer from '../components/ui/Footer';
import SearchFilters from '../components/ui/SearchFilters';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorias] = useState(['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX']);
  const [selectedCat, setSelectedCat] = useState('INICIO');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showOutOfStock, setShowOutOfStock] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('productos')
          .select('*');

        if (error) throw error;

        const processedProducts = data.map(product => ({
          ...product,
          imagen_url: product.imagen_url || 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen',
          precio_normal: parseFloat(product.precio_normal) || 0,
          promocion: product.promocion ? parseFloat(product.promocion) : null,
          stock: parseInt(product.stock) || 0
        }));

        const uniqueBrands = [...new Set(processedProducts.map(p => p.marca).filter(Boolean))];
        setBrands(uniqueBrands.sort());

        setProducts(processedProducts);
        setFiltered(processedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    
    if (!showOutOfStock) {
      result = result.filter(p => p.stock > 0);
    }
    
    if (selectedCat !== 'INICIO') {
      result = result.filter(p => p.categoria === selectedCat);
    }
    
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(search) ||
        p.descripcion?.toLowerCase().includes(search) ||
        p.categoria.toLowerCase().includes(search)
      );
    }

    if (priceRange) {
      result = result.filter(p => {
        const precio = p.promocion && p.promocion < p.precio_normal ? p.promocion : p.precio_normal;
        return precio >= priceRange.min && precio <= priceRange.max;
      });
    }

    if (selectedBrand) {
      result = result.filter(p => p.marca === selectedBrand);
    }
    
    setFiltered(result);
  }, [selectedCat, searchTerm, priceRange, selectedBrand, products, showOutOfStock]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }

    setCartItems(prevItems => {
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
      return [...prevItems, { ...product, qty: 1 }];
    });
    toast.success('Producto agregado al carrito');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-luxury-900"></div>
      </div>
    );
  }

  return (
    <>
      <Header
        categories={categorias}
        selectedCategory={selectedCat}
        onCategorySelect={setSelectedCat}
        onSearch={setSearchTerm}
        onPriceRangeChange={setPriceRange}
        onBrandChange={setSelectedBrand}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
        onCartClick={() => setIsCartOpen(true)}
        isMobile={isMobile}
        brands={brands}
        showOutOfStock={showOutOfStock}
        onToggleOutOfStock={setShowOutOfStock}
      />

      <main className="max-w-8xl mx-auto px-4 sm:px-6 pt-32 pb-20">
        <div className="mb-8">
          <SearchFilters
            onSearch={setSearchTerm}
            onPriceRangeChange={setPriceRange}
            onBrandChange={setSelectedBrand}
            onToggleOutOfStock={setShowOutOfStock}
            showOutOfStock={showOutOfStock}
            brands={brands}
          />
        </div>

        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-luxury-500">No se encontraron productos</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={() => setSelectedProduct(product)}
                  onAddToCart={addToCart}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          formatCurrency={formatCurrency}
        />
      )}

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(productId, newQty) => {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.id === productId
                ? { ...item, qty: newQty }
                : item
            ).filter(item => item.qty > 0)
          );
        }}
        onRemove={(productId) => {
          setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
        }}
        formatCurrency={formatCurrency}
      />
    </>
  );
}

export default CatalogPage;