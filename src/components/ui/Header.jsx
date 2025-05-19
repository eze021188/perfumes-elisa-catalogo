import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SearchBar from '../ui/SearchBar';
import CategoryFilters from '../ui/CategoryFilters';
import CartButton from '../ui/CartButton';
import ViewToggle from '../ui/ViewToggle';

export default function Header({ 
  onSearch, 
  categories, 
  selectedCategory,
  onCategorySelect,
  cartItemsCount,
  onCartClick,
  viewMode,
  onViewModeChange,
  onMenuClick,
  isMobile 
}) {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 left-0 right-0 bg-white z-20 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto">
        {/* Banner superior */}
        <div className="bg-black text-white py-2 px-4 text-center text-sm font-medium tracking-wide">
          {t('exclusiveOffer')}
        </div>

        {/* Contenido principal del header */}
        <div className="px-6 py-4 flex items-center justify-between">
          {isMobile && (
            <button
              onClick={onMenuClick}
              className="p-2 text-gray-800 hover:text-black transition-colors"
              aria-label={t('toggleMenu')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}

          <div className="flex-1 max-w-xl">
            <SearchBar onSearch={onSearch} />
          </div>

          <img
            src="/imagen/PERFUMESELISAwhite.jpg"
            alt="Perfumes Elisa Logo"
            className="h-14 object-contain hidden lg:block mx-8"
          />

          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <CategoryFilters
                categories={categories}
                selected={selectedCategory}
                onSelect={onCategorySelect}
              />
            </div>
            <ViewToggle view={viewMode} onChange={onViewModeChange} />
            <CartButton count={cartItemsCount} onClick={onCartClick} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}