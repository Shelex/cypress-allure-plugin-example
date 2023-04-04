// by @NathanPLC

describe('Multiple domains', () => {
    it('Visit Site 1 - Google', () => {
        cy.visit('https://www.google.com');
        cy.wrap(true).should('be.eq', true);
    });

    it('Visit Site 2 - Bing', () => {
        cy.visit('https://www.bing.com');
        cy.wrap(true).should('be.eq', true);
    });

    it('Visit Site 3 - Yahoo', () => {
        cy.visit('https://www.yahoo.com');
        cy.wrap(true).should('be.eq', false);
    });
});
