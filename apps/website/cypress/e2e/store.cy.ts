beforeEach(() => {
  cy.visit('http://localhost:8000/store');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Coming Soon').should('exist');
  });
});
