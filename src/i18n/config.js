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
          search: 'Buscar fragancias exclusivas...',
          cart: 'Carrito',
          addToCart: 'Añadir al carrito',
          outOfStock: 'Agotado',
          notifyMe: 'Notificarme',
          inStock: 'disponibles',
          contact: 'Contacto',
          delivery: 'Entrega',
          stock: 'Disponibilidad',
          price: 'Precio',
          exclusive: 'Exclusivo',
          exclusiveOffer: '✨ ENVÍO GRATIS EN COMPRAS SUPERIORES A $1499 ✨',
          categories: {
            all: 'COLECCIÓN COMPLETA',
            women: 'FRAGANCIAS FEMENINAS',
            men: 'FRAGANCIAS MASCULINAS',
            unisex: 'COLECCIÓN UNISEX'
          }
        }
      },
      en: {
        translation: {
          search: 'Search exclusive fragrances...',
          cart: 'Cart',
          addToCart: 'Add to cart',
          outOfStock: 'Out of stock',
          notifyMe: 'Notify me',
          inStock: 'in stock',
          contact: 'Contact',
          delivery: 'Delivery',
          stock: 'Availability',
          price: 'Price',
          exclusive: 'Exclusive',
          exclusiveOffer: '✨ FREE SHIPPING ON ORDERS OVER $1499 ✨',
          categories: {
            all: 'COMPLETE COLLECTION',
            women: 'WOMEN\'S FRAGRANCES',
            men: 'MEN\'S FRAGRANCES',
            unisex: 'UNISEX COLLECTION'
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