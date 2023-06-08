describe('Allure test name duplicates (same suite, same test names)', () => {
    it('non-unique test name', () => {
        cy.log(`is in file test.duplicate.name.one.cy.js`);
        cy.wrap(true).should('be.eq', true);
    });
});
