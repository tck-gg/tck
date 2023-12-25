beforeEach(() => {
  cy.visit('http://localhost:8000/affiliates');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Affiliates').should('exist');
  });
});
