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
      className="group bg-white rounded-2xl luxury-card-shadow flex flex-col cursor-pointer overflow-hidden"
      onClick={() => onProductClick(product)}
    >
      {/* Etiqueta de descuento */}
      {discount && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-luxury-900 text-white px-4 py-1.5 text-xs tracking-wider font-medium rounded-full">
            {discount}% OFF
          </div>
        </div>
      )}

      {/* Categoría */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm text-luxury-900 px-3 py-1 text-xs tracking-wider font-medium rounded-full">
          {categoria}
        </div>
      </div>

      {/* Image container */}
      <div className="relative aspect-square bg-luxury-50 overflow-hidden">
        <img
          src={imagen_url}
          alt={nombre}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x400/f8f7f4/433d36?text=Imagen+no+disponible';
            e.target.onerror = null;
          }}
        />
        <div className="absolute inset-0 bg-luxury-900/0 group-hover:bg-luxury-900/5 transition-colors duration-300" />
      </div>

      {/* Información del producto */}
      <div className="p-6 flex flex-col gap-4 flex-grow">
        <h3 className="font-display text-xl text-luxury-900 leading-snug line-clamp-2">
          {nombre}
        </h3>

        {/* Precios */}
        <div className="mt-auto space-y-2">
          {promocion !== null && promocion < precio_normal ? (
            <>
              <div className="text-luxury-400 line-through text-sm">
                {formatCurrency(precio_normal)}
              </div>
              <div className="text-luxury-900 text-2xl font-display">
                {formatCurrency(promocion)}
              </div>
            </>
          ) : (
            <div className="text-luxury-900 text-2xl font-display">
              {formatCurrency(precio_normal)}
            </div>
          )}
        </div>

        {/* Footer con stock y botón */}
        <div className="flex items-center justify-between pt-4 border-t border-luxury-100">
          <p className="text-sm text-luxury-500 font-medium">
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
            className="btn-luxury rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {stock > 0 ? t('addToCart') : t('notifyMe')}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}