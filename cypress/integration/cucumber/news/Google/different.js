import { Given, Then, Before } from 'cypress-cucumber-preprocessor/steps';

const url = 'https://google.com';

let myBeforeCount = 0;

// This verifies that the hooks work with bundling feature
// https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/pull/234
Before(() => {
    expect(myBeforeCount).to.be.lessThan(6);
    myBeforeCount += 1;
});

Given(`I kinda open Google page`, () => {
    cy.visit(url);
});

// This is the same step that we have in socialNetworks/Facebook/different.js, but you don't have to worry about collisions!
Then(`I am very happy`, () => {
    cy.title().should('include', 'Google');
});

Then(`I see {string} in the title`, (title) => {
    cy.title().should('include', title);
});

When(`I sum {int} and {int}`, (a, b) => {
    cy.allure().parameter('a', a).parameter('b', b);
    cy.screenshot('this_is_cy_screenshot');
    cy.wrap(a + b).as('sumResult');
});

Then(`I want to see {int}`, (expected) => {
    cy.get('@sumResult').should('equal', expected);
    cy.get('@sumResult').then((sum) => {
        cy.allure().attachment(
            'this_is_json_attached',
            JSON.stringify(
                {
                    hello: 'world',
                    sum: sum
                },
                null,
                2
            ),
            'text/plain'
        );
    });
});
