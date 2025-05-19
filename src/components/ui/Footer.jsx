import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-luxury-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Columna 1: Información de la empresa */}
        <div className="space-y-4">
          <img 
            src="/imagen/PERFUMESELISA.png" 
            alt="Perfumes Elisa" 
            className="h-16 object-contain"
          />
          <p className="text-sm text-luxury-200">
            Perfumes Elisa es tu destino para fragancias exclusivas y de alta calidad.
            Ofrecemos una cuidadosa selección de perfumes para dama y caballero.
          </p>
        </div>

        {/* Columna 2: Contacto */}
        <div>
          <h3 className="text-lg font-display mb-4">Contacto</h3>
          <ul className="space-y-2 text-sm text-luxury-200">
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              +52 81 3080 4010
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              contacto@perfumeselisa.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Apodaca, N.L., México
            </li>
          </ul>
        </div>

        {/* Columna 3: Horario */}
        <div>
          <h3 className="text-lg font-display mb-4">Horario de Atención</h3>
          <ul className="space-y-2 text-sm text-luxury-200">
            <li>Lunes a Viernes</li>
            <li>10:00 a.m. a 6:00 p.m.</li>
            <li>Sábado</li>
            <li>10:00 a.m. a 2:00 p.m.</li>
          </ul>
        </div>

        {/* Columna 4: Información y Redes Sociales */}
        <div>
          <h3 className="text-lg font-display mb-4">Información</h3>
          <ul className="space-y-2 text-sm text-luxury-200">
            <li>
              <Link to="/como-aplicar" className="hover:text-white transition-colors">
                Cómo aplicar una fragancia
              </Link>
            </li>
            <li>
              <Link to="/preguntas-fragancias" className="hover:text-white transition-colors">
                Preguntas sobre perfumes
              </Link>
            </li>
          </ul>

          {/* Redes Sociales */}
          <div className="mt-6">
            <h3 className="text-lg font-display mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/PerfumesElisa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-200 hover:text-white transition-colors"
              >
                <img
                  src="/imagen/iconos/facebook-bn.jpg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://www.instagram.com/perfumes.elisa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-200 hover:text-white transition-colors"
              >
                <img
                  src="/imagen/iconos/instagram-bn.jpg"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://wa.me/528130804010"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-200 hover:text-white transition-colors"
              >
                <img
                  src="/imagen/iconos/whatsapp-bn.jpg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-luxury-800">
        <p className="text-center text-sm text-luxury-400">
          © {new Date().getFullYear()} Perfumes Elisa. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}