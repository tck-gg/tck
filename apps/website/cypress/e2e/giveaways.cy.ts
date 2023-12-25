beforeEach(() => {
  cy.visit('http://localhost:8000/giveaways');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Giveaways').should('exist');
  });
});
