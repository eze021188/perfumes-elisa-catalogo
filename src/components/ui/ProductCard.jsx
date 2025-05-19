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
      className="group bg-white rounded-2xl luxury-card-shadow aspect-[3/4] flex flex-col cursor-pointer overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      {/* Imagen del producto - 60% del espacio */}
      <div className="relative w-full h-[60%] bg-white overflow-hidden">
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

      {/* Información del producto - 40% del espacio */}
      <div className="p-3 flex flex-col h-[40%] justify-between bg-luxury-200">
        {/* Nombre del producto */}
        <h3 className="text-sm text-luxury-900 leading-tight line-clamp-2 mb-2 font-medium">
          {nombre}
        </h3>

        {/* Precio y stock */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex flex-col">
            {promocion !== null && promocion < precio_normal && (
              <span className="text-luxury-400 line-through text-xs">
                {formatCurrency(precio_normal)}
              </span>
            )}
            <span className="text-luxury-900 font-semibold">
              {formatCurrency(promocion !== null && promocion < precio_normal ? promocion : precio_normal)}
            </span>
          </div>
          
          <div className="text-xs text-luxury-500">
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
          className="w-full bg-luxury-900 text-white py-1.5 text-xs font-medium rounded-xl
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-luxury-800 transition-colors"
        >
          {stock > 0 ? t('addToCart') : t('notifyMe')}
        </button>
      </div>
    </motion.article>
  );
}