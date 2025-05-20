import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

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
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/perfumeselisa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-200 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/528130804010"
                target="_blank"
                rel="noopener noreferrer"
                className="text-luxury-200 hover:text-white transition-colors"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
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