describe('Allure links', () => {
    it('should be configurable with prefix env variables', () => {
        cy.allure().tms('xray', 'CYP-15');
        Cypress.env('tmsPrefix', 'https://example.tms.com/case/');
        Cypress.env('issuePrefix', 'https://example.issue.com/ticket/');
    });

    it('should be able to add link to test management system', () => {
        cy.allure().tms('xray', 'CYP-16');
        cy.allure().tms('test in tms', 'ID_OF_TEST_CASE');
    });

    it('should accept * character as pattern in tmsPrefix configuration', () => {
        cy.allure().tms('xray', 'CYP-17');
        Cypress.env('tmsPrefix', 'https://example.tms.com/case/*.aspx');
        cy.allure().tms('test in tms', 'ID_OF_TEST_CASE_INSIDE_PATTERN');
    });

    it('should be able to add link to issue tracker', () => {
        cy.allure().tms('xray', 'CYP-18');
        cy.allure().issue('ticket', 'ID_OF_TICKET');
    });

    it('should be able to add link other external system', () => {
        cy.allure().tms('xray', 'CYP-19');
        cy.allure().link('https://example.com', 'with tms icon', 'tms');
        cy.allure().link('https://example.com', 'with bug icon', 'issue');
        cy.allure().link('https://example.com', 'without icon');
    });
});
