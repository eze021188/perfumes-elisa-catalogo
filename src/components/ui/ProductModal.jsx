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
        className="bg-white w-full max-w-md overflow-hidden rounded-lg shadow-xl"
      >
        {/* Header */}
        <div className="relative border-b border-gray-200">
          <h2 className="p-4 text-xl font-display text-center">{product.nombre}</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Precio */}
        <div className="p-4 text-center border-b border-gray-200">
          {product.promocion && product.promocion < product.precio_normal ? (
            <>
              <span className="text-gray-400 line-through text-lg">
                {formatCurrency(product.precio_normal)}
              </span>
              <span className="text-2xl font-display ml-2">
                {formatCurrency(product.promocion)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-display">
              {formatCurrency(product.precio_normal)}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4 space-y-4">
          {/* Imagen */}
          <div className="bg-gray-50 p-4 flex items-center justify-center">
            <img
              src={product.imagen_url}
              alt={product.nombre}
              className="max-h-[200px] w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=No+Imagen';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Descripción */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <div className="text-sm text-gray-600">
                {product.descripcion_html ? (
                  <div dangerouslySetInnerHTML={{ __html: product.descripcion_html }} />
                ) : (
                  product.descripcion
                )}
              </div>
            </div>

            {/* Pirámide olfativa */}
            {product.piramide_olfativa && (
              <div>
                <h3 className="font-medium mb-2">Pirámide Olfativa</h3>
                <div className="space-y-2 text-sm">
                  {product.piramide_olfativa.salida?.length > 0 && (
                    <div>
                      <p className="font-medium">Notas de Salida:</p>
                      <p className="text-gray-600">{product.piramide_olfativa.salida.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.corazon?.length > 0 && (
                    <div>
                      <p className="font-medium">Notas de Corazón:</p>
                      <p className="text-gray-600">{product.piramide_olfativa.corazon.join(', ')}</p>
                    </div>
                  )}
                  {product.piramide_olfativa.fondo?.length > 0 && (
                    <div>
                      <p className="font-medium">Notas de Fondo:</p>
                      <p className="text-gray-600">{product.piramide_olfativa.fondo.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Detalles adicionales */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Categoría</p>
                <p className="text-gray-600">{product.categoria}</p>
              </div>
              <div>
                <p className="font-medium">Stock disponible</p>
                <p className="text-gray-600">{product.stock}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer con botón */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium
                     disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800
                     transition-colors duration-200"
          >
            {product.stock > 0 ? t('addToCart') : t('outOfStock')}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}