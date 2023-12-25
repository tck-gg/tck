beforeEach(() => {
  cy.visit('http://localhost:8000/reloads');
});

describe('Smoke', () => {
  it('exists', () => {
    cy.contains('$14 Reload').should('exist');
  });
});
