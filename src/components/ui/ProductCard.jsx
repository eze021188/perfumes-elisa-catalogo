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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg overflow-hidden shadow-md relative flex flex-col cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => onProductClick(product)}
    >
      {discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          -{discount}%
        </span>
      )}

      <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        <img
          src={imagenUrl || 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen'}
          alt={nombre}
          className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen';
            e.target.onerror = null;
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {nombre}
        </h3>

        <div className="mt-auto">
          {promocion !== null && promocion < precio_normal ? (
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-gray-500 line-through text-sm">
                {formatCurrency(precio_normal)}
              </span>
              <span className="text-green-600 font-bold text-lg">
                {formatCurrency(promocion)}
              </span>
            </div>
          ) : (
            <p className="text-gray-700 font-bold text-lg mb-2">
              {formatCurrency(precio_normal)}
            </p>
          )}

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-gray-600">
              Stock: <span className="font-medium">{stock}</span>
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              disabled={stock <= 0}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors text-xs"
              title={stock > 0 ? t('addToCart') : t('outOfStock')}
            >
              {stock > 0 ? '+' : '×'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}