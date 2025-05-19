import React from 'react';
import { motion } from 'framer-motion';

export default function CartModal({ isOpen, onClose, items, onRemove, onQuantityChange, formatCurrency }) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const precio = item.promocion && item.promocion < item.precio_normal ? item.promocion : item.precio_normal;
    return sum + (precio * item.qty);
  }, 0);

  const handleWhatsAppClick = () => {
    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${items.map(item => {
      const precio = item.promocion && item.promocion < item.precio_normal ? item.promocion : item.precio_normal;
      return `${item.qty}x ${item.nombre} - ${formatCurrency(precio)}\n`;
    }).join('')}\nTotal: ${formatCurrency(total)}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/528130804010?text=${encodedMessage}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-lg shadow-xl"
      >
        <div className="p-6 border-b border-luxury-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-display text-luxury-900">Carrito</h2>
            <button
              onClick={onClose}
              className="text-luxury-400 hover:text-luxury-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-center text-luxury-500">Tu carrito está vacío</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.imagen_url || 'https://placehold.co/80x80/f8f7f4/433d36?text=No+Imagen'}
                    alt={item.nombre}
                    className="w-20 h-20 object-contain bg-luxury-50 rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-luxury-900">{item.nombre}</h3>
                    <p className="text-luxury-900 font-display">
                      {formatCurrency(item.promocion && item.promocion < item.precio_normal ? item.promocion : item.precio_normal)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onQuantityChange(item.id, item.qty - 1)}
                        className="text-luxury-400 hover:text-luxury-900"
                      >-</button>
                      <span className="text-luxury-900">{item.qty}</span>
                      <button
                        onClick={() => onQuantityChange(item.id, item.qty + 1)}
                        className="text-luxury-400 hover:text-luxury-900"
                      >+</button>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="ml-4 text-red-500 hover:text-red-600"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-luxury-100">
            <div className="flex justify-between items-center mb-4">
              <span className="text-luxury-900 font-medium">Total</span>
              <span className="text-2xl font-display text-luxury-900">{formatCurrency(total)}</span>
            </div>
            {total >= 1499 && (
              <p className="text-green-600 text-sm text-center mb-4">
                ¡Felicidades! Tu pedido incluye envío gratis
              </p>
            )}
            <button
              onClick={handleWhatsAppClick}
              className="w-full btn-luxury bg-green-600 hover:bg-green-700"
            >
              Hacer pedido por WhatsApp
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}