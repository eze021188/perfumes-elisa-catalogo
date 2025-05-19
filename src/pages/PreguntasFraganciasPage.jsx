import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Layout from '../components/layout/Layout';

export default function PreguntasFraganciasPage() {
  return (
    <Layout>
      <SEOHead 
        title="Preguntas sobre perfumes"
        description="Respuestas a las preguntas más frecuentes sobre fragancias y perfumes"
      />
      
      <div className="min-h-screen bg-luxury-50">
        <div className="max-w-4xl mx-auto px-4 py-24">
          <Link to="/" className="text-accent hover:text-accent-dark mb-8 inline-block">
            ← Volver al catálogo
          </Link>
          
          <h1 className="text-4xl font-display text-luxury-900 mb-12">Preguntas sobre perfumes</h1>
          
          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Son auténticos nuestros perfumes?</h2>
              <p className="text-luxury-700">Todos nuestros productos son 100% originales y nuevos. Los perfumes se compran a fabricantes o distribuidores autorizados y se entregan en su embalaje original.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Cuál es la diferencia entre Eau de Parfum, Eau de Toilette y Eau de Colonia?</h2>
              <p className="text-luxury-700 mb-4">Estos términos dan una idea sobre la fuerza de la fragancia. La regla es que cuanto mayor sea el porcentaje de aceites esenciales, más durará la fragancia y menos necesitará aplicar.</p>
              <ul className="list-disc pl-6 space-y-2 text-luxury-700">
                <li><strong>Perfume:</strong> Es la fragancia más potente disponible, con una concentración de aceite de perfume de entre el 15 y el 25%. Es la fragancia más duradera.</li>
                <li><strong>Eau de Parfum:</strong> Es menos fuerte que un Parfum y tiene una concentración de alrededor del 8-15% de aceite de perfume.</li>
                <li><strong>Eau de Toilette:</strong> Es menos fuerte en comparación con el Eau De Parfum y tiene una concentración de alrededor del 4-10% de aceite de perfume.</li>
                <li><strong>Eau Fraiche:</strong> Este tipo de perfumes suelen tener una concentración de 3% o menos de aceite de perfume.</li>
                <li><strong>Agua de Colonia:</strong> Es más ligera que el Eau de Toilette y tiene una concentración de aceite de perfume del 2 al 5%. Se la suele llamar colonia y presenta la mayor dilución de fragancias. Su duración suele ser de 2 horas.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Qué son las notas de fragancia y sus tipos?</h2>
              <p className="text-luxury-700 mb-4">Las notas de fragancia describen los aromas que se perciben al aplicar un perfume. Existen tres tipos de notas:</p>
              <ul className="list-disc pl-6 space-y-2 text-luxury-700">
                <li><strong>Notas de salida:</strong> Son la primera impresión olfativa de una fragancia una vez aplicada. Son aromas más ligeros y volátiles que se evaporan fácilmente. Su duración suele ser de 5 a 25 minutos.</li>
                <li><strong>Notas medias:</strong> Conforman el cuerpo de la mezcla. Pueden ser evidentes desde el principio. Para apreciarlas, hay que esperar entre 15 y 30 minutos. Son las notas que clasifican la familia aromática (floral, oriental, chipre, etc.).</li>
                <li><strong>Notas de fondo:</strong> Son las de mayor peso molecular y las más duraderas. Entre las notas de fondo más comunes se encuentran el musgo de roble, el pachulí, las maderas, el almizcle y la vainilla.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Qué es Tester?</h2>
              <p className="text-luxury-700">Los productos Tester son 100% genuinos, auténticos, nunca han sido usados y vienen directamente del fabricante.</p>
              <p className="text-luxury-700 mt-4">Un probador es una versión de una fragancia que no tiene el elegante empaque original. Vienen en el mismo frasco que la versión original e incluyen la misma cantidad y calidad de fragancia. Generalmente, vienen en una caja blanca o de cartón. Al no tener empaques decorativos, compramos estos artículos a un precio más bajo y te ofrecemos el ahorro.</p>
              <p className="text-luxury-700 mt-4">Algunos de los probadores no vienen con tapas.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Cómo hacer que el aroma de mi fragancia dure más tiempo en mi cuerpo?</h2>
              <p className="text-luxury-700">Según nuestra experiencia, si se usa la fragancia en capas con un gel de baño y ducha, la fragancia durará más. Otro consejo: si se rocía en zonas sensibles del cuerpo, como la parte posterior de las orejas o el cuello, puede durar más. También se puede rociar en la parte baja del cuerpo para un efecto más duradero.</p>
            </section>

            <section>
              <h2 className="text-2xl font-display text-luxury-800 mb-4">¿Cómo sé qué perfume es mejor para mí?</h2>
              <p className="text-luxury-700 mb-6">Las notas de una fragancia se determinan en parte por cuándo se usa y para quién está diseñada. Por ejemplo, notas animálicas prominentes, como el almizcle, y frutas oscuras, como la cereza negra o la ciruela, aparecen en fragancias de noche por su sensualidad y su aroma en un smoking. Las notas verdes y cítricas son frescas y vigorizantes, más adecuadas para el día. Tu personalidad y preferencias también influyen, ya que, al igual que las personas, las fragancias pueden ser tradicionales o únicas; juveniles o maduras; burbujeantes y alegres o suaves y dulces. Presta atención a estos descriptores para ver si una fragancia se ajusta a tu estilo.</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-display text-luxury-800 mb-4">PARA MUJERES</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-bold">Si buscas: ropa de oficina o ropa sutil para el día.</p>
                      <p><strong>Elige:</strong> florales clásicos</p>
                      <p><strong>¿Por qué?:</strong> Estas notas son simples y discretas, especialmente rosas y flores blancas.</p>
                      <p><strong>Busque notas como:</strong> jazmín, rosa, peonía y lirio de los valles.</p>
                      <p><strong>Fragancias populares:</strong> Bvlgari Pour Femme y Chloé de Chloé</p>
                    </div>

                    <div>
                      <p className="font-bold">Si estás buscando: algo para ocasiones sociales y divertidas, ropa informal.</p>
                      <p><strong>Elige:</strong> florales clásicos</p>
                      <p><strong>¿Por qué?:</strong> La dulzura y las notas de base suaves transmiten una sensación relajada y juvenil.</p>
                      <p><strong>Busque notas como:</strong> vainilla, caramelo, azúcar, manzanas, bayas y duraznos.</p>
                      <p><strong>Fragancias populares:</strong> Vera Wang Princess y Juicy Couture Viva la Juicy</p>
                    </div>

                    <div>
                      <p className="font-bold">Si buscas: ropa de noche atrevida y sensual</p>
                      <p><strong>Elige:</strong> amaderado y almizclado</p>
                      <p><strong>¿Por qué?:</strong> Las maderas son suaves y profundas, mientras que los almizcles y otros animálicos añaden una rica sensualidad.</p>
                      <p><strong>Busque notas como:</strong> almizcle blanco, sándalo, ámbar, cedro y pachulí; también verá a menudo notas de flores o frutas oscuras.</p>
                      <p><strong>Fragancias populares:</strong> Gucci Premiere y Revlon Ciara</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-display text-luxury-800 mb-4">PARA HOMBRES</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <p className="font-bold">Si buscas: un aroma deportivo, fresco y diurno que no evoque un anuncio de Axe</p>
                      <p><strong>Elige:</strong> cítricos, aromáticos o acuáticos.</p>
                      <p><strong>¿Por qué?:</strong> Los cítricos y los acuáticos son intensos y refrescantes, y los aromáticos especiados añaden masculinidad y carácter.</p>
                      <p><strong>Busca notas como:</strong> naranja, bergamota, limón, jengibre, canela, nuez moscada, pimienta, notas marinas, notas acuáticas, sal, algas.</p>
                      <p><strong>Fragancias populares:</strong> Tommy Bahama Very Cool y Azzaro Chrome Sport</p>
                    </div>

                    <div>
                      <p className="font-bold">Si buscas: un aroma de noche matizado, sexy y masculino.</p>
                      <p><strong>Elige:</strong> amaderado-especiado, animálico</p>
                      <p><strong>¿Por qué?:</strong> Las especias y las maderas añaden profundidad, y los tonos animálicos resultan casi universalmente atractivos.</p>
                      <p><strong>Busque notas como:</strong> pimienta, salvia, cedro, almizcle, ámbar, cuero, ginebra.</p>
                      <p><strong>Fragancias populares:</strong> Bvlgari Pour Homme Soir y Calvin Klein Eternity for Men.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}