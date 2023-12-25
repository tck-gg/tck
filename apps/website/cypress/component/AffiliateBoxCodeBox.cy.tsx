import AffiliateBoxCodeBox from '../../src/components/AffiliateBoxCodeBox/AffiliateBoxCodeBox';

beforeEach(() => {
  cy.mount(<AffiliateBoxCodeBox>TEST</AffiliateBoxCodeBox>);
});

describe('<AffiliateBoxCodeBox>', () => {
  it('mounts', () => {
    // Should mount.
  });
  it('contains the code', () => {
    cy.get('span').contains('TEST');
  });
  it('copies the code', () => {
    cy.get('svg > path').eq(1).should('have.attr', 'fill', '#989eae');

    cy.get('span').eq(1).realClick();
    cy.get('svg').eq(1).should('have.attr', 'data-icon', 'check');
    cy.window()
      .its('navigator.clipboard')
      .then((clip) => {
        return clip.readText();
      })
      .should('equal', 'TEST');
    cy.get('svg > path').eq(1).should('not.have.attr', 'fill', '#989eae');

    cy.wait(1500);
    cy.get('svg > path').eq(1).should('have.attr', 'fill', '#989eae');
  });
});
