import React from 'react';
import { motion } from 'framer-motion';

export default function ProductModal({ product, onClose, onAddToCart, formatCurrency }) {
  if (!product) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="w-full md:w-1/2 bg-luxury-50 p-8 flex items-center justify-center">
            <img
              src={product.imagen_url || 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen'}
              alt={product.nombre}
              className="max-w-full h-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Información */}
          <div className="w-full md:w-1/2 p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-display text-luxury-900">{product.nombre}</h2>
              <button
                onClick={onClose}
                className="text-luxury-400 hover:text-luxury-900 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              {product.promocion && product.promocion < product.precio_normal ? (
                <>
                  <p className="text-luxury-400 line-through text-lg">
                    {formatCurrency(product.precio_normal)}
                  </p>
                  <p className="text-luxury-900 text-3xl font-display">
                    {formatCurrency(product.promocion)}
                  </p>
                </>
              ) : (
                <p className="text-luxury-900 text-3xl font-display">
                  {formatCurrency(product.precio_normal)}
                </p>
              )}
            </div>

            <div className="prose prose-luxury mb-8" dangerouslySetInnerHTML={{ __html: product.descripcion_html }} />

            <div className="space-y-4">
              <p className="text-luxury-500">
                Stock disponible: <span className="font-medium text-luxury-900">{product.stock}</span>
              </p>

              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
                className="w-full btn-luxury disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}