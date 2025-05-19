import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          search: 'Buscar...',
          cart: 'Carrito',
          addToCart: 'Agregar al carrito',
          outOfStock: 'Agotado',
          contact: 'Contacto',
          delivery: 'Entrega',
          stock: 'Stock',
          price: 'Precio',
          categories: {
            all: 'INICIO',
            women: 'FRAGANCIA FEMENINA',
            men: 'FRAGANCIA MASCULINA',
            unisex: 'UNISEX'
          }
        }
      },
      en: {
        translation: {
          search: 'Search...',
          cart: 'Cart',
          addToCart: 'Add to cart',
          outOfStock: 'Out of stock',
          contact: 'Contact',
          delivery: 'Delivery',
          stock: 'Stock',
          price: 'Price',
          categories: {
            all: 'HOME',
            women: 'WOMEN FRAGRANCE',
            men: 'MEN FRAGRANCE',
            unisex: 'UNISEX'
          }
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;