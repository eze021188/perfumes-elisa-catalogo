import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

export default function ComoAplicarPage() {
  return (
    <>
      <SEOHead 
        title="Cómo aplicar una fragancia"
        description="Aprende a aplicar correctamente tu fragancia para maximizar su duración y efecto"
      />
      
      <div className="min-h-screen bg-luxury-50">
        <div className="max-w-3xl mx-auto px-4 py-24">
          <Link to="/" className="text-accent hover:text-accent-dark mb-8 inline-block">
            ← Volver al catálogo
          </Link>
          
          <h1 className="text-4xl font-display text-luxury-900 mb-12">Cómo aplicar una fragancia</h1>
          
          <div className="prose prose-luxury max-w-none">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display text-luxury-800 mb-4">Consejo 1</h2>
                <p>Como la piel húmeda fija mejor el aroma, aplica la fragancia justo después de ducharte o bañarte y antes de vestirte.</p>
              </div>

              <div>
                <h2 className="text-2xl font-display text-luxury-800 mb-4">Consejo 2</h2>
                <p>Aplica la fragancia en tus puntos de pulso para un efecto más seductor y una difusión más fuerte. Rocía la fragancia desde al menos 15-20 centímetros del área de aplicación.</p>
              </div>

              <div>
                <h2 className="text-2xl font-display text-luxury-800 mb-4">Consejo 3</h2>
                <p>Para un efecto más difuso, rocía la fragancia en el aire y camina a través de ella.</p>
              </div>

              <div className="bg-luxury-100 p-6 rounded-lg">
                <p className="italic">Espera hasta que la fragancia se haya secado en tu piel antes de olerla. Frotar la piel después de rociar el perfume destruirá el vínculo y alterará el aroma.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}