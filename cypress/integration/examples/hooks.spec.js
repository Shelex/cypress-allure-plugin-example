describe('Allure hooks', () => {
    before(() => {
        cy.log('from before');
    });
    beforeEach(() => {
        cy.log('from beforeEach');
    });
    afterEach(() => {
        cy.log('from afterEach');
    });
    after(() => {
        cy.log('from after');
    });
    it('should log before hooks as pre-requisites and each hooks as steps', () => {
        cy.log('from test');
    });
});
