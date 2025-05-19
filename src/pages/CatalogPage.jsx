import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { supabase } from '../supabaseClient';
import Header from '../components/ui/Header';
import ProductCard from '../components/ui/ProductCard';
import ProductModal from '../components/ui/ProductModal';
import CartModal from '../components/ui/CartModal';

function CatalogPage() {
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

      <main className="max-w-8xl mx-auto px-4 sm:px-6 pt-32 pb-20">
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
    </>
  );
}

export default CatalogPage;