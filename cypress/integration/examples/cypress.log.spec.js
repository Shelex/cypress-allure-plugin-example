// config
// allureLogCypress

describe('Allure Cypress log', () => {
    it('should be configurable by allureLogCypress env variable', () => {
        Cypress.env('allureLogCypress', true);
    });

    it('should log cypress commands as steps when allureLogCypress is enabled', () => {
        cy.wrap(42).as('number');
        cy.log('this is message from cy log command');
        cy.get('@number').should('be.eq', 42);
    });

    it('should log cypress custom command as separate step', () => {
        cy.wrap(42).as('number');
        cy.log('this is message from cy log command');
        cy.customCommand(100, 200, 300, 400, 500);
        cy.get('@number').should('be.eq', 42);
    });

    it('should not log cypress commands when allureLogCypress is disabled', () => {
        Cypress.env('allureLogCypress', false);
        cy.wrap(42).as('number');
        cy.log('this is message from cy log command');
        cy.get('@number').should('be.eq', 42);
    });
});
