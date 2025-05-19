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
        className="bg-white w-full max-w-2xl overflow-hidden relative"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Imagen */}
          <div className="bg-gray-50 p-6 flex items-center justify-center">
            <img
              src={product.imagen_url}
              alt={product.nombre}
              className="max-h-[300px] w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Contenido */}
          <div className="p-6 flex flex-col h-[500px] md:h-[400px] overflow-y-auto">
            <h2 className="text-xl font-medium mb-2">{product.nombre}</h2>
            
            <div className="mb-4">
              {product.promocion && product.promocion < product.precio_normal ? (
                <>
                  <span className="text-gray-400 line-through text-sm">
                    {formatCurrency(product.precio_normal)}
                  </span>
                  <span className="text-xl font-medium block">
                    {formatCurrency(product.promocion)}
                  </span>
                </>
              ) : (
                <span className="text-xl font-medium">
                  {formatCurrency(product.precio_normal)}
                </span>
              )}
            </div>

            {product.descripcion_html ? (
              <div 
                className="prose prose-sm max-w-none mb-4"
                dangerouslySetInnerHTML={{ __html: product.descripcion_html }} 
              />
            ) : (
              <p className="text-gray-600 mb-4 text-sm">{product.descripcion}</p>
            )}

            {product.piramide_olfativa && (
              <div className="space-y-3 mb-4">
                {product.piramide_olfativa.salida?.length > 0 && (
                  <div>
                    <p className="font-medium text-xs uppercase tracking-wide text-gray-500">Notas de Salida</p>
                    <p className="text-sm">{product.piramide_olfativa.salida.join(', ')}</p>
                  </div>
                )}
                {product.piramide_olfativa.corazon?.length > 0 && (
                  <div>
                    <p className="font-medium text-xs uppercase tracking-wide text-gray-500">Notas de Corazón</p>
                    <p className="text-sm">{product.piramide_olfativa.corazon.join(', ')}</p>
                  </div>
                )}
                {product.piramide_olfativa.fondo?.length > 0 && (
                  <div>
                    <p className="font-medium text-xs uppercase tracking-wide text-gray-500">Notas de Fondo</p>
                    <p className="text-sm">{product.piramide_olfativa.fondo.join(', ')}</p>
                  </div>
                )}
              </div>
            )}

            <div className="mt-auto pt-4 border-t">
              <p className="text-sm text-gray-500 mb-2">
                Stock disponible: <span className="font-medium">{product.stock}</span>
              </p>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
                className="w-full bg-gray-900 text-white py-2 px-4 text-sm font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-800 transition-colors"
              >
                {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}