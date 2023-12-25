beforeEach(() => {
  cy.visit('http://localhost:8000/terms');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Terms of Service').should('exist');
  });
});
