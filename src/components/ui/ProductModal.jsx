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
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={handleBackdropClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-lg max-h-[90vh] overflow-auto rounded-lg shadow-xl"
      >
        {/* Header con botón de cerrar */}
        <div className="sticky top-0 z-10 bg-white border-b border-luxury-100 p-4 flex justify-between items-center">
          <h2 className="text-xl font-display text-luxury-900 line-clamp-1">{product.nombre}</h2>
          <button
            onClick={onClose}
            className="text-luxury-400 hover:text-luxury-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Imagen y precios */}
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/2">
              <div className="bg-luxury-50 rounded-lg p-4 flex items-center justify-center">
                <img
                  src={product.imagen_url}
                  alt={product.nombre}
                  className="max-w-full h-auto max-h-[200px] sm:max-h-[250px] object-contain"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen';
                    e.target.onerror = null;
                  }}
                />
              </div>
            </div>

            <div className="w-full sm:w-1/2 space-y-4">
              {/* Precios */}
              <div>
                {product.promocion && product.promocion < product.precio_normal ? (
                  <>
                    <p className="text-luxury-400 line-through text-sm">
                      {formatCurrency(product.precio_normal)}
                    </p>
                    <p className="text-luxury-900 text-2xl font-display">
                      {formatCurrency(product.promocion)}
                    </p>
                  </>
                ) : (
                  <p className="text-luxury-900 text-2xl font-display">
                    {formatCurrency(product.precio_normal)}
                  </p>
                )}
              </div>

              {/* Stock */}
              <p className="text-sm text-luxury-500">
                Stock disponible: <span className="font-medium text-luxury-900">{product.stock}</span>
              </p>

              {/* Categoría */}
              <p className="text-sm text-luxury-500">
                Categoría: <span className="font-medium text-luxury-900">{product.categoria}</span>
              </p>
            </div>
          </div>

          {/* Descripción */}
          {product.descripcion_html && (
            <div className="mt-6 prose prose-sm prose-luxury max-w-none">
              <div dangerouslySetInnerHTML={{ __html: product.descripcion_html }} />
            </div>
          )}

          {/* Pirámide olfativa si existe */}
          {product.piramide_olfativa && (
            <div className="mt-6 space-y-4">
              <h3 className="font-display text-lg text-luxury-900">Pirámide Olfativa</h3>
              
              {product.piramide_olfativa.salida?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-luxury-900">Notas de Salida:</p>
                  <p className="text-sm text-luxury-500">{product.piramide_olfativa.salida.join(', ')}</p>
                </div>
              )}
              
              {product.piramide_olfativa.corazon?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-luxury-900">Notas de Corazón:</p>
                  <p className="text-sm text-luxury-500">{product.piramide_olfativa.corazon.join(', ')}</p>
                </div>
              )}
              
              {product.piramide_olfativa.fondo?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-luxury-900">Notas de Fondo:</p>
                  <p className="text-sm text-luxury-500">{product.piramide_olfativa.fondo.join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer con botón de acción */}
        <div className="sticky bottom-0 bg-white border-t border-luxury-100 p-4">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className="w-full btn-luxury disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? t('addToCart') : t('outOfStock')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}