Cypress.Commands.add('customCommand', (one, two, ...args) => {
    cy.log('this is message from cy custom command');
    cy.log(one);
    cy.log(two);
    args.forEach((arg) => {
        cy.log(arg);
    });
});
