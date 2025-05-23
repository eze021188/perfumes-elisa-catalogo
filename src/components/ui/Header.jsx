import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SearchFilters from './SearchFilters';

export default function Header({
  onSearch,
  onPriceRangeChange,
  onBrandChange,
  categories,
  selectedCategory,
  onCategorySelect,
  cartItemsCount,
  onCartClick,
  viewMode,
  onViewModeChange,
  onMenuClick,
  isMobile,
  brands = [],
  showOutOfStock,
  onToggleOutOfStock
}) {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    if (onViewModeChange) {
      onViewModeChange(isMenuOpen ? 'grid' : 'list');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-luxury-100"
    >
      {/* Banner promocional */}
      <div className="bg-luxury-900 text-white py-2.5">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-medium tracking-wider">
            {t('exclusiveOffer')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Barra principal */}
        <div className="px-6 py-4 flex items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/imagen/PERFUMESELISAwhite.jpg"
              alt="Perfumes Elisa"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Búsqueda con filtros */}
          <div className="flex-grow">
            <SearchFilters
              onSearch={onSearch}
              onPriceRangeChange={onPriceRangeChange}
              onBrandChange={onBrandChange}
              brands={brands}
              showOutOfStock={showOutOfStock}
              onToggleOutOfStock={onToggleOutOfStock}
            />
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-6">
            <nav className="hidden lg:flex items-center gap-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => onCategorySelect(category)}
                  className={`text-sm font-medium tracking-wide transition-colors
                    ${selectedCategory === category
                      ? 'text-luxury-900 border-b-2 border-accent'
                      : 'text-luxury-500 hover:text-luxury-900'
                    }`}
                >
                  {category}
                </button>
              ))}
            </nav>

            {/* Carrito */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-luxury-900 hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Menú móvil */}
            {isMobile && (
              <button
                onClick={handleMenuClick}
                className="lg:hidden p-2 text-luxury-900 hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}