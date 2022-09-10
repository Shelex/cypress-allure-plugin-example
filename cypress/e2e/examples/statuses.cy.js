describe('Allure test statuses', () => {
    it('should be passed', () => {
        cy.wrap(true).should('be.eq', true);
    });

    it.skip('should be skipped', () => {});

    it('should be failed', () => {
        cy.wrap(true).should('be.eq', false);
    });
});
