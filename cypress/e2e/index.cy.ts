beforeEach(() => {
  cy.visit('http://localhost:8000');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Test').should('exist');
  });
});
