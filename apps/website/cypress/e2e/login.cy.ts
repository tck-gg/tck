beforeEach(() => {
  cy.visit('http://localhost:8000/login');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Welcome back!').should('exist');
  });
});
