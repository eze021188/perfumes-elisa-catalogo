import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ 
  product, 
  onProductClick, 
  onAddToCart,
  formatCurrency 
}) {
  const { t } = useTranslation();
  const { 
    id, 
    nombre, 
    imagenUrl, 
    precio_normal, 
    promocion, 
    stock 
  } = product;

  const discount = promocion !== null && promocion < precio_normal 
    ? Math.round(((precio_normal - promocion) / precio_normal) * 100) 
    : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl relative flex flex-col cursor-pointer border border-gray-100"
      onClick={() => onProductClick(product)}
    >
      {/* Etiqueta de descuento */}
      {discount && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-black bg-opacity-90 text-white text-xs font-medium px-3 py-1 rounded-full">
            {t('exclusive')} -{discount}%
          </div>
        </div>
      )}

      {/* Imagen del producto con overlay */}
      <div className="relative w-full pt-[100%] bg-gray-50 overflow-hidden">
        <img
          src={imagenUrl || 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen'}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen';
            e.target.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Contenido del producto */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <h3 className="font-serif text-lg text-gray-900 leading-snug tracking-wide line-clamp-2">
          {nombre}
        </h3>

        <div className="mt-auto space-y-4">
          {/* Precios */}
          {promocion !== null && promocion < precio_normal ? (
            <div className="space-y-1">
              <div className="text-gray-400 line-through text-sm">
                {formatCurrency(precio_normal)}
              </div>
              <div className="text-xl font-medium">
                {formatCurrency(promocion)}
              </div>
            </div>
          ) : (
            <div className="text-xl font-medium">
              {formatCurrency(precio_normal)}
            </div>
          )}

          {/* Botón de acción y stock */}
          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-500 font-medium">
              {stock > 0 ? (
                <span>{stock} {t('inStock')}</span>
              ) : (
                <span className="text-red-500">{t('outOfStock')}</span>
              )}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={stock <= 0}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg 
                         hover:bg-gray-900 disabled:opacity-50 disabled:hover:bg-black 
                         transition-colors duration-200"
            >
              {stock > 0 ? t('addToCart') : t('notifyMe')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}