beforeEach(() => {
  cy.visit('http://localhost:8000/leaderboards');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Leaderboards').should('exist');
  });
});
