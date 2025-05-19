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
        className="bg-white w-full max-w-xl overflow-hidden relative rounded-2xl"
      >
        <div className="flex flex-col">
          {/* Header con título y botón cerrar */}
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-xl font-product font-bold text-luxury-900">{product.nombre}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 p-6">
            {/* Imagen */}
            <div className="bg-gray-50 p-4 flex items-center justify-center rounded-xl">
              <img
                src={product.imagen_url}
                alt={product.nombre}
                className="max-h-[280px] w-auto object-contain"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen';
                  e.target.onerror = null;
                }}
              />
            </div>

            {/* Contenido */}
            <div className="flex flex-col h-[280px] overflow-y-auto">
              <div className="mb-4">
                {/* Precios */}
                <div className="flex items-center gap-3 mb-2">
                  {/* Precio promocional */}
                  <span className="text-2xl font-product font-bold text-luxury-900">
                    {formatCurrency(product.promocion && product.promocion < product.precio_normal ? product.promocion : product.precio_normal)}
                  </span>
                  
                  {/* Precio normal tachado en rojo */}
                  {product.promocion && product.promocion < product.precio_normal && (
                    <span className="text-red-600 line-through text-lg font-product">
                      {formatCurrency(product.precio_normal)}
                    </span>
                  )}
                </div>
                
                <div className="text-sm font-product text-gray-600">
                  Categoría: {product.categoria}
                </div>
                <div className="text-sm font-product text-gray-600">
                  Disponibles: {product.stock}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-product font-bold text-gray-900 mb-2">Descripción</h3>
                {product.descripcion_html ? (
                  <div 
                    className="prose prose-sm max-w-none font-product"
                    dangerouslySetInnerHTML={{ __html: product.descripcion_html }} 
                  />
                ) : (
                  <p className="text-gray-600 text-sm font-product">{product.descripcion}</p>
                )}
              </div>

              {product.piramide_olfativa && (
                <div className="space-y-3">
                  <h3 className="text-sm font-product font-bold text-gray-900">Pirámide Olfativa</h3>
                  {product.piramide_olfativa.salida?.length > 0 && (
                    <div>
                      <p className="text-xs font-product font-bold text-gray-500">Notas de Salida</p>
                      <p className="text-sm font-product">{product.piramide_olfativa.salida.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.corazon?.length > 0 && (
                    <div>
                      <p className="text-xs font-product font-bold text-gray-500">Notas de Corazón</p>
                      <p className="text-sm font-product">{product.piramide_olfativa.corazon.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.fondo?.length > 0 && (
                    <div>
                      <p className="text-xs font-product font-bold text-gray-500">Notas de Fondo</p>
                      <p className="text-sm font-product">{product.piramide_olfativa.fondo.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer con botón */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => onAddToCart(product)}
              disabled={product.stock <= 0}
              className="w-full bg-blue-600 text-white py-2 px-4 text-sm font-product font-bold rounded-full
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:bg-blue-700 transition-colors"
            >
              {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}