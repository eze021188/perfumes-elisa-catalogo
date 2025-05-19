import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';
import Header from '../components/ui/Header';
import ProductCard from '../components/ui/ProductCard';

export default function CatalogPage() {
  const { t } = useTranslation();
  const [productos, setProductos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('INICIO');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const categorias = ['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX'];
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('productos').select('*');
        if (error) throw error;

        const productsWithCorrectData = data.map(p => ({
          ...p,
          imagenUrl: p.imagen_url || 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen',
          stock: parseFloat(p.stock) || 0,
          precio_normal: parseFloat(p.precio_normal) || 0,
          promocion: parseFloat(p.promocion) || null
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

  useEffect(() => {
    let result = productos;
    if (selectedCat !== 'INICIO') {
      result = result.filter(p => p.categoria === selectedCat);
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.nombre.toLowerCase().includes(term) ||
        p.descripcion?.toLowerCase().includes(term)
      );
    }
    setFiltered(result);
  }, [searchTerm, selectedCat, productos]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const addToCart = (product) => {
    if (product.stock <= 0) {
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
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
    <div className="min-h-screen bg-luxury-50">
      <Header
        onSearch={setSearchTerm}
        categories={categorias}
        selectedCategory={selectedCat}
        onCategorySelect={setSelectedCat}
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20">
        {/* Título de sección */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display text-luxury-900 mb-4">
            {selectedCat === 'INICIO' ? 'Nuestra Colección' : selectedCat}
          </h1>
          <p className="text-luxury-500 max-w-2xl mx-auto">
            Descubre nuestra exclusiva selección de fragancias premium, 
            cuidadosamente seleccionadas para los amantes del perfume más exigentes.
          </p>
        </div>

        {/* Grid de productos */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-luxury-500 text-lg">
                No se encontraron productos que coincidan con tu búsqueda.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onAddToCart={addToCart}
                  formatCurrency={formatCurrency}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-luxury-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <img
                src="/imagen/PERFUMESELISAwhite.jpg"
                alt="Perfumes Elisa"
                className="h-16 w-auto object-contain mb-6"
              />
              <p className="text-luxury-200 text-sm">
                Tu destino para fragancias exclusivas y experiencias olfativas únicas.
              </p>
            </div>
            
            <div>
              <h3 className="font-display text-xl mb-4">Contacto</h3>
              <ul className="space-y-2 text-luxury-200">
                <li>WhatsApp: +528130804010</li>
                <li>Email: contacto@perfumeselisa.com</li>
                <li>Ubicación: Apodaca, N.L.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com/perfumeselisa" className="text-luxury-200 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="https://instagram.com/perfumeselisa" className="text-luxury-200 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-display text-xl mb-4">Envíos</h3>
              <ul className="space-y-2 text-luxury-200 text-sm">
                <li>Entregas personales en puntos establecidos</li>
                <li>Envíos locales desde $80</li>
                <li>Envíos nacionales desde $139</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-luxury-700 mt-12 pt-8 text-center text-luxury-300 text-sm">
            <p>© {new Date().getFullYear()} Perfumes Elisa. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}