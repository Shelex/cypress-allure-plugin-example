describe('Allure attachments', () => {
    it('should be able to attach file to executable by content', () => {
        cy.allure().step('attachment should be inside this step');
        cy.fixture('example').then((content) => {
            cy.allure().attachment(
                'example',
                JSON.stringify(content, null, 2),
                'application/json'
            );
        });
    });

    it('should be able to attach file to test by content', () => {
        cy.allure().step('attachment should be outside of this step');
        cy.fixture('example').then((content) => {
            cy.allure().testAttachment(
                'example',
                JSON.stringify(content, null, 2),
                'application/json'
            );
        });
    });

    it('should be able to attach existing file to test by path', () => {
        cy.allure().fileAttachment(
            'example',
            'cypress/fixtures/example.json',
            'application/json'
        );
    });
});
