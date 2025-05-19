import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
  formatCurrency,
  viewMode = 'grid'
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

  if (viewMode === 'list') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-center"
        onClick={() => onProductClick(product)}
      >
        <img
          src={imagen_url}
          alt={nombre}
          className="w-24 h-24 object-contain"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=Imagen+no+disponible';
            e.target.onerror = null;
          }}
        />
        
        <div className="flex-grow">
          <h3 className="font-medium text-luxury-900">{nombre}</h3>
          <div className="flex items-center gap-2 mt-1">
            {promocion !== null && promocion < precio_normal && (
              <span className="text-red-600 line-through text-sm">
                {formatCurrency(precio_normal)}
              </span>
            )}
            <span className="font-bold text-luxury-900">
              {formatCurrency(promocion !== null && promocion < precio_normal ? promocion : precio_normal)}
            </span>
          </div>
          <div className="text-sm text-luxury-600 mt-1">Stock: {stock}</div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={stock <= 0}
          className="bg-accent text-white px-4 py-2 rounded-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-accent-dark transition-colors"
        >
          {stock > 0 ? t('addToCart') : t('notifyMe')}
        </button>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xl luxury-card-shadow aspect-[3/4] flex flex-col cursor-pointer overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      <div className="relative w-full h-[50%] bg-luxury-100 overflow-hidden">
        <img
          src={imagen_url}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=Imagen+no+disponible';
            e.target.onerror = null;
          }}
        />
        
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm text-luxury-800 px-3 py-1 text-xs font-medium rounded-full">
            {categoria}
          </div>
        </div>

        {discount && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-red-600 text-white px-3 py-1 text-xs font-medium rounded-full">
              -{discount}%
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col h-[50%] justify-between bg-luxury-200">
        <h3 className="font-product text-sm leading-tight line-clamp-2 mb-4 font-bold text-luxury-900">
          {nombre}
        </h3>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {promocion !== null && promocion < precio_normal && (
              <span className="text-base font-bold text-luxury-900">
                {formatCurrency(promocion)}
              </span>
            )}
            
            <span className={`text-sm ${promocion !== null && promocion < precio_normal ? 'text-red-600 line-through' : 'text-luxury-900 font-bold'}`}>
              {formatCurrency(precio_normal)}
            </span>
          </div>
          
          <div className="text-xs text-luxury-600">
            Stock: {stock}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          disabled={stock <= 0}
          className="w-full bg-accent/90 text-white py-1.5 text-xs font-medium rounded-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-accent transition-colors"
        >
          {stock > 0 ? t('addToCart') : t('notifyMe')}
        </button>
      </div>
    </motion.article>
  );
}