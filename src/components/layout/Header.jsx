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
      className="fixed top-0 left-0 right-0 bg-white shadow z-20"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-800 rounded-md hover:bg-gray-100"
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

        <SearchBar onSearch={onSearch} />

        <img
          src="/imagen/PERFUMESELISAwhite.jpg"
          alt="Perfumes Elisa Logo"
          className="h-12 object-contain hidden lg:block"
        />

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
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
    </motion.header>
  );
}