describe('Allure tests structure', () => {
    it('"Tests structure", "behaviors", "labels"', () => {
        cy.allure()
            .epic('Tests structure')
            .feature('behaviors')
            .story('labels');
    });
});

describe('Allure tests structure', () => {
    it('"Set in test", "Using commands"', () => {
        cy.allure()
            .parentSuite('Allure tests structure')
            .suite('Set in test')
            .subSuite('Using commands');
    });
});

describe('label storage', () => {
    beforeEach(() => {
        const allure = Cypress.Allure.reporter.getInterface();
        allure.parentSuite('Allure tests structure');
        allure.suite('Label storage');
        allure.subSuite('Set in beforeEach');
    });

    it('"Label storage", "Set in beforeEach"', () => {});

    it('"Label storage", "Set in test"', () => {
        cy.allure()
            .parentSuite('Allure tests structure')
            .suite('Label storage')
            .subSuite('Set in test');
    });
});
