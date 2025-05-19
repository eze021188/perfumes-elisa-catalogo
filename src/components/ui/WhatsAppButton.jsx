import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppButton() {
  const handleClick = () => {
    window.open('https://wa.me/528130804010', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageSquare 
        className="w-6 h-6 group-hover:scale-110 transition-transform" 
        fill="currentColor"
      />
    </button>
  );
}