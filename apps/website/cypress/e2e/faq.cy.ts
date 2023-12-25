beforeEach(() => {
  cy.visit('http://localhost:8000/faq');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('FAQ').should('exist');
  });
});
