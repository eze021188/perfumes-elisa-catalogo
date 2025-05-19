import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchFilters({
  onSearch,
  onPriceRangeChange,
  onBrandChange,
  minPrice = 0,
  maxPrice = 5000,
  brands = []
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: minPrice, max: maxPrice });
  const [selectedBrand, setSelectedBrand] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handlePriceChange = (type, value) => {
    const newRange = { ...priceRange, [type]: value };
    setPriceRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    onBrandChange(brand);
  };

  return (
    <div className="w-full max-w-2xl">
      {/* Barra de búsqueda principal */}
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar fragancias exclusivas..."
          className="w-full px-4 py-3 pl-12 pr-10 text-sm bg-white border border-luxury-200 rounded-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-luxury-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-luxury-400 hover:text-luxury-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </button>
      </div>

      {/* Panel de filtros expandible */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 p-4 bg-white border border-luxury-200 rounded-lg shadow-lg"
          >
            <div className="space-y-4">
              {/* Rango de precios */}
              <div>
                <h3 className="text-sm font-medium text-luxury-900 mb-2">Rango de precios</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="text-xs text-luxury-500 mb-1 block">Mínimo</label>
                    <input
                      type="number"
                      min={minPrice}
                      max={priceRange.max}
                      value={priceRange.min}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-luxury-200 rounded focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-luxury-500 mb-1 block">Máximo</label>
                    <input
                      type="number"
                      min={priceRange.min}
                      max={maxPrice}
                      value={priceRange.max}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-luxury-200 rounded focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Selector de marca */}
              {brands.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-luxury-900 mb-2">Marca</h3>
                  <select
                    value={selectedBrand}
                    onChange={handleBrandChange}
                    className="w-full px-3 py-2 text-sm border border-luxury-200 rounded focus:outline-none focus:border-accent"
                  >
                    <option value="">Todas las marcas</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}