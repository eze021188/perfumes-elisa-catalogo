import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProductModal({ product, onClose, onAddToCart, formatCurrency }) {
  const { t } = useTranslation();
  
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
        className="bg-white w-full max-w-4xl overflow-hidden rounded-lg shadow-xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="w-full md:w-1/2 bg-luxury-50 p-8 flex items-center justify-center">
            <img
              src={product.imagen_url}
              alt={product.nombre}
              className="max-h-[400px] w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Contenido */}
          <div className="w-full md:w-1/2 p-8 relative">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-luxury-400 hover:text-luxury-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Nombre y precio */}
            <h2 className="text-2xl font-display mb-4">{product.nombre}</h2>
            <div className="mb-6">
              {product.promocion && product.promocion < product.precio_normal ? (
                <div className="space-y-1">
                  <span className="text-luxury-400 line-through text-lg block">
                    {formatCurrency(product.precio_normal)}
                  </span>
                  <span className="text-2xl font-display text-luxury-900 block">
                    {formatCurrency(product.promocion)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-display text-luxury-900 block">
                  {formatCurrency(product.precio_normal)}
                </span>
              )}
            </div>

            {/* Descripción */}
            <div className="prose prose-sm max-w-none mb-8">
              {product.descripcion_html ? (
                <div dangerouslySetInnerHTML={{ __html: product.descripcion_html }} />
              ) : (
                <p>{product.descripcion}</p>
              )}
            </div>

            {/* Pirámide olfativa */}
            {product.piramide_olfativa && (
              <div className="mb-8">
                <h3 className="font-display text-lg mb-4">Pirámide Olfativa</h3>
                <div className="space-y-4">
                  {product.piramide_olfativa.salida?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm text-luxury-900">Notas de Salida</p>
                      <p className="text-sm text-luxury-600">{product.piramide_olfativa.salida.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.corazon?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm text-luxury-900">Notas de Corazón</p>
                      <p className="text-sm text-luxury-600">{product.piramide_olfativa.corazon.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.fondo?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm text-luxury-900">Notas de Fondo</p>
                      <p className="text-sm text-luxury-600">{product.piramide_olfativa.fondo.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stock y botón */}
            <div className="mt-auto">
              <p className="text-sm text-luxury-500 mb-4">
                Stock disponible: <span className="font-medium">{product.stock}</span>
              </p>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
                className="w-full btn-luxury disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? t('addToCart') : t('outOfStock')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}