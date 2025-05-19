import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Header
        categories={['INICIO', 'FRAGANCIA FEMENINA', 'FRAGANCIA MASCULINA', 'UNISEX']}
        selectedCategory="INICIO"
        onCategorySelect={() => {}}
        onSearch={() => {}}
        cartItemsCount={0}
        onCartClick={() => {}}
      />
      {children}
      <Footer />
    </>
  );
}