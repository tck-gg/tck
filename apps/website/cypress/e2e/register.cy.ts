beforeEach(() => {
  cy.visit('http://localhost:8000/register');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Register').should('exist');
  });
});
