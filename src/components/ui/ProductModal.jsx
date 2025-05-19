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
        className="bg-white max-w-3xl w-full overflow-hidden relative"
      >
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Imagen */}
          <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
            <img
              src={product.imagen_url}
              alt={product.nombre}
              className="max-h-[400px] w-auto object-contain"
              onError={(e) => {
                e.target.src = 'https://placehold.co/400x400/e2e8f0/333?text=No+Imagen';
                e.target.onerror = null;
              }}
            />
          </div>

          {/* Contenido */}
          <div className="w-full md:w-1/2 p-8 flex flex-col">
            {/* Nombre y precio */}
            <h2 className="text-2xl font-medium mb-2">{product.nombre}</h2>
            <div className="mb-6">
              {product.promocion && product.promocion < product.precio_normal ? (
                <>
                  <span className="text-gray-400 line-through text-lg block">
                    {formatCurrency(product.precio_normal)}
                  </span>
                  <span className="text-2xl font-medium">
                    {formatCurrency(product.promocion)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-medium">
                  {formatCurrency(product.precio_normal)}
                </span>
              )}
            </div>

            {/* Descripción */}
            {product.descripcion_html ? (
              <div 
                className="prose prose-sm max-w-none mb-6"
                dangerouslySetInnerHTML={{ __html: product.descripcion_html }} 
              />
            ) : (
              <p className="text-gray-600 mb-6">{product.descripcion}</p>
            )}

            {/* Pirámide olfativa */}
            {product.piramide_olfativa && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-4">Pirámide Olfativa</h3>
                <div className="space-y-4">
                  {product.piramide_olfativa.salida?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm">Notas de Salida</p>
                      <p className="text-sm text-gray-600">
                        {product.piramide_olfativa.salida.join(', ')}
                      </p>
                    </div>
                  )}
                  {product.piramide_olfativa.corazon?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm">Notas de Corazón</p>
                      <p className="text-sm text-gray-600">
                        {product.piramide_olfativa.corazon.join(', ')}
                      </p>
                    </div>
                  )}
                  {product.piramide_olfativa.fondo?.length > 0 && (
                    <div>
                      <p className="font-medium text-sm">Notas de Fondo</p>
                      <p className="text-sm text-gray-600">
                        {product.piramide_olfativa.fondo.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stock y botón */}
            <div className="mt-auto">
              <p className="text-sm text-gray-500 mb-4">
                Stock disponible: <span className="font-medium">{product.stock}</span>
              </p>
              <button
                onClick={() => onAddToCart(product)}
                disabled={product.stock <= 0}
                className="w-full bg-gray-900 text-white py-3 px-6 font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-800 transition-colors"
              >
                {product.stock > 0 ? 'Agregar al carrito' : 'Agotado'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}