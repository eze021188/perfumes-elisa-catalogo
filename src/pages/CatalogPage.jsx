import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';
import Header from '../components/ui/Header';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import CartModal from '../components/ui/CartModal';

export default function CatalogPage() {
  const [productos, setProductos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const categorias = ['FRAGANCIA MASCULINA', 'FRAGANCIA FEMENINA', 'UNISEX'];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .order('nombre');
        
        if (error) throw error;

        const productsWithCorrectData = data.map(p => ({
          ...p,
          imagen_url: p.imagen_url || 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen',
          stock: parseInt(p.stock) || 0,
          precio_normal: parseFloat(p.precio_normal) || 0,
          promocion: p.promocion ? parseFloat(p.promocion) : null,
          categoria: normalizarCategoria(p.categoria)
        }));

        setProductos(productsWithCorrectData);
        setFiltered(productsWithCorrectData);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error al cargar los productos');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const normalizarCategoria = (categoria) => {
    if (!categoria) return '';
    
    const cat = categoria.toUpperCase();
    if (cat.includes('MASCULINA') || cat.includes('HOMBRE')) return 'FRAGANCIA MASCULINA';
    if (cat.includes('FEMENINA') || cat.includes('MUJER')) return 'FRAGANCIA FEMENINA';
    if (cat.includes('UNISEX')) return 'UNISEX';
    return categoria;
  };

  useEffect(() => {
    let result = productos;
    
    if (selectedCat) {
      result = result.filter(p => 
        normalizarCategoria(p.categoria) === normalizarCategoria(selectedCat)
      );
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.nombre?.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term)
      );
    }
    
    setFiltered(result);
  }, [searchTerm, selectedCat, productos]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const addToCart = (product) => {
    if (!product.stock || product.stock <= 0) {
      toast.error(`${product.nombre} está agotado`);
      return;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          toast.error(`Stock insuficiente para ${product.nombre}`);
          return prev;
        }
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      toast.success(`${product.nombre} añadido al carrito`);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateCartItemQuantity = (productId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(productId);
      return;
    }

    const product = productos.find(p => p.id === productId);
    if (!product || newQty > product.stock) {
      toast.error(`Stock insuficiente para ${product?.nombre}`);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, qty: newQty }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const product = productos.find(p => p.id === productId);
    setCartItems(prev => prev.filter(item => item.id !== productId));
    if (product) {
      toast.success(`${product.nombre} eliminado del carrito`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-50 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto"/>
          <p className="text-luxury-500 font-medium">Cargando colección...</p>
        </div>
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
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
        onCartClick={() => setIsCartOpen(true)}
        isMobile={isMobile}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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

      <footer className="bg-luxury-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src="/imagen/PERFUMESELISA.png"
                alt="Perfumes Elisa"
                className="h-16 w-auto object-contain mb-6"
              />
              <p className="text-luxury-200 text-sm">
                Tu destino para fragancias exclusivas
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-xl mb-4">Contacto</h3>
              <ul className="space-y-2 text-luxury-200">
                <li className="flex items-center gap-2">
                  <img src="/imagen/iconos/whatsapp-bn.jpg" alt="" className="w-5 h-5" />
                  +528130804010
                </li>
                <li className="flex items-center gap-2">
                  <img src="/imagen/iconos/email-bn.jpg" alt="" className="w-5 h-5" />
                  contacto@perfumeselisa.com
                </li>
                <li className="flex items-center gap-2">
                  <img src="/imagen/iconos/location-bn.jpg" alt="" className="w-5 h-5" />
                  Apodaca, N.L.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com/perfumeselisa" target="_blank" rel="noopener noreferrer" className="text-luxury-200 hover:text-white transition-colors flex items-center gap-2">
                  <img src="/imagen/iconos/facebook-bn.jpg" alt="" className="w-5 h-5" />
                  Facebook
                </a>
                <a href="https://instagram.com/perfumeselisa" target="_blank" rel="noopener noreferrer" className="text-luxury-200 hover:text-white transition-colors flex items-center gap-2">
                  <img src="/imagen/iconos/instagram-bn.jpg" alt="" className="w-5 h-5" />
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Envíos</h3>
              <ul className="space-y-2 text-luxury-200">
                <li className="flex items-center gap-2">
                  <img src="/imagen/iconos/truck-bn.jpg" alt="" className="w-5 h-5" />
                  Entregas personales en puntos establecidos
                </li>
                <li>Envíos locales desde $80</li>
                <li>Envíos nacionales desde $139</li>
                <li className="text-accent font-medium">
                  ¡Envío gratis en compras mayores a $1,499!
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={addToCart}
            formatCurrency={formatCurrency}
          />
        )}

        {isCartOpen && (
          <CartModal
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
            items={cartItems}
            onRemove={removeFromCart}
            onQuantityChange={updateCartItemQuantity}
            formatCurrency={formatCurrency}
          />
        )}
      </AnimatePresence>
    </>
  );
}