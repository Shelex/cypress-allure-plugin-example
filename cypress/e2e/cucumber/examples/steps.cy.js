import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('some precondition', () => {
    cy.log(`given`);
});

When('I do some actions', () => {
    cy.log(`when`);
});

Then('I get some result', () => {
    cy.log(`then`);
});

Then('I am very happy', () => {
    cy.title().should('not.include', 'Google');
});

When('I sum {int} and {int}', (a, b) => {
    cy.allure().parameter('a', a).parameter('b', b);
    cy.wrap(a + b).as('sumResult');
});

Then('I want to see {int}', (expected) => {
    cy.get('@sumResult').should('equal', expected);
    cy.get('@sumResult').then((sum) => {
        cy.allure().testAttachment(
            'this_is_json_attached',
            JSON.stringify(
                {
                    hello: 'world',
                    sum: sum
                },
                null,
                2
            ),
            'application/json'
        );
    });
});
