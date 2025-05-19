import React from 'react';

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
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +52 81 3080 4010
            </li>
            <li className="flex items-center gap-2">
              <img 
                src="/imagen/iconos/email-bn.jpg" 
                alt="Email" 
                className="w-4 h-4 object-contain"
              />
              contacto@perfumeselisa.com
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
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

        {/* Columna 4: Redes Sociales */}
        <div>
          <h3 className="text-lg font-display mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/perfumeselisa/" target="_blank" rel="noopener noreferrer" className="text-luxury-200 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://www.instagram.com/perfumeselisa/" target="_blank" rel="noopener noreferrer" className="text-luxury-200 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="https://wa.me/528130804010" target="_blank" rel="noopener noreferrer" className="text-luxury-200 hover:text-white transition-colors">
              <span className="sr-only">WhatsApp</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M20.283 3.717C18.067 1.5 15.017 0.25 11.8 0.25c-6.617 0-12 5.383-12 12 0 2.117 0.55 4.183 1.6 6l-1.7 6.2c-0.117 0.4 0.25 0.767 0.65 0.65l6.2-1.7c1.817 1.05 3.883 1.6 6 1.6 6.617 0 12-5.383 12-12 0-3.217-1.25-6.267-3.467-8.483zm-8.483 18.533c-1.783 0-3.533-0.483-5.067-1.4l-0.367-0.217-3.8 1 1-3.8-0.233-0.367c-0.917-1.533-1.4-3.283-1.4-5.067 0-5.467 4.45-9.917 9.917-9.917 2.65 0 5.133 1.033 7 2.9s2.9 4.35 2.9 7c0 5.467-4.45 9.917-9.917 9.917zm5.433-7.417c-0.3-0.15-1.767-0.867-2.033-0.967-0.267-0.1-0.467-0.15-0.667 0.15-0.2 0.3-0.767 0.967-0.933 1.167-0.167 0.2-0.333 0.217-0.633 0.067-0.3-0.15-1.267-0.467-2.4-1.483-0.883-0.783-1.483-1.767-1.65-2.067-0.167-0.3-0.017-0.45 0.133-0.6 0.133-0.133 0.3-0.333 0.45-0.5 0.15-0.167 0.2-0.283 0.3-0.483 0.1-0.2 0.05-0.367-0.025-0.517-0.075-0.15-0.667-1.617-0.917-2.217-0.25-0.6-0.5-0.517-0.667-0.517-0.167 0-0.367-0.025-0.567-0.025s-0.517 0.075-0.783 0.375c-0.267 0.3-1.033 1-1.033 2.45s1.067 2.85 1.217 3.05c0.15 0.2 2.117 3.233 5.133 4.533 0.717 0.3 1.283 0.483 1.717 0.633 0.717 0.233 1.367 0.2 1.883 0.117 0.567-0.083 1.767-0.717 2.017-1.417 0.25-0.7 0.25-1.283 0.167-1.417-0.083-0.133-0.283-0.2-0.583-0.35z" clipRule="evenodd" />
              </svg>
            </a>
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