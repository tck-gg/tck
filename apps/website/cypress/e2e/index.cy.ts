beforeEach(() => {
  cy.visit('http://localhost:8000');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('The Most Rewarding Website').should('exist');
  });
});
