describe('Failed in global hooks', () => {
    before('should fail', () => {
        cy.wrap(true).should('not.be.undefined');
    });

    beforeEach('is not even executed', () => {
        cy.wrap(true).should('not.be.undefined');
    });

    it('should create a blank test with error when cypress got uncaught exception', () => {
        cy.wrap(true).should('be.eq', true);
    });

    afterEach('is not even executed', () => {
        cy.wrap(true).should('not.be.undefined');
    });

    after(`should not fail`, () => {
        cy.wrap(non_existing_after_all_variable).should('not.be.undefined');
    });
});
