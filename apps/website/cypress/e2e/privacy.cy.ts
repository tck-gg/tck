beforeEach(() => {
  cy.visit('http://localhost:8000/privacy');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Privacy Policy').should('exist');
  });
});
