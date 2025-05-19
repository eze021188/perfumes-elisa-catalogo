describe('Catálogo de Productos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('muestra el catálogo de productos', () => {
    cy.get('[data-testid="product-grid"]').should('be.visible');
  });

  it('permite buscar productos', () => {
    cy.get('[data-testid="search-input"]')
      .type('perfume');
    cy.get('[data-testid="product-card"]').should('have.length.gt', 0);
  });

  it('permite filtrar por categoría', () => {
    cy.get('[data-testid="category-filter"]')
      .contains('FRAGANCIA FEMENINA')
      .click();
    cy.get('[data-testid="product-card"]').should('have.length.gt', 0);
  });

  it('permite agregar productos al carrito', () => {
    cy.get('[data-testid="add-to-cart-button"]')
      .first()
      .click();
    cy.get('[data-testid="cart-count"]').should('have.text', '1');
  });
});