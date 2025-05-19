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
    nombre,
    imagen_url,
    precio_normal,
    promocion,
    stock,
    categoria
  } = product;

  const discount = promocion !== null && promocion < precio_normal
    ? Math.round(((precio_normal - promocion) / precio_normal) * 100)
    : null;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-2xl luxury-card-shadow aspect-square flex flex-col cursor-pointer overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      {/* Imagen del producto */}
      <div className="relative w-full h-[65%] bg-luxury-50 overflow-hidden">
        <img
          src={imagen_url}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=Imagen+no+disponible';
            e.target.onerror = null;
          }}
        />
        
        {/* Etiqueta de descuento */}
        {discount && (
          <div className="absolute top-4 left-4">
            <div className="bg-luxury-900 text-white px-3 py-1 text-xs font-medium rounded-full">
              -{discount}%
            </div>
          </div>
        )}

        {/* Categoría */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm text-luxury-900 px-3 py-1 text-xs font-medium rounded-full">
            {categoria}
          </div>
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-display text-lg text-luxury-900 leading-tight line-clamp-2 mb-2">
          {nombre}
        </h3>

        {/* Contenedor de precio y stock */}
        <div className="mt-auto flex justify-between items-baseline mb-4">
          <div className="space-y-1">
            {promocion !== null && promocion < precio_normal && (
              <div className="text-luxury-400 line-through text-sm">
                {formatCurrency(precio_normal)}
              </div>
            )}
            <div className="text-luxury-900 text-lg font-display">
              {formatCurrency(promocion !== null && promocion < precio_normal ? promocion : precio_normal)}
            </div>
          </div>
          
          <div className="text-sm text-luxury-500">
            {stock} {t('inStock')}
          </div>
        </div>

        {/* Botón de acción */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={stock <= 0}
          className="w-full bg-luxury-900 text-white py-2 text-sm font-medium rounded-xl
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-luxury-800 transition-colors"
        >
          {stock > 0 ? t('addToCart') : t('notifyMe')}
        </button>
      </div>
    </motion.article>
  );
}