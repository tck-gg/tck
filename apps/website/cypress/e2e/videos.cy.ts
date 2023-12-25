beforeEach(() => {
  cy.visit('http://localhost:8000/videos');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('Videos').should('exist');
  });
});
