describe('Allure screenshots', () => {
    it('should attach screenshot automatically', () => {
        cy.screenshot();
    });

    it('should attach screenshot with custom name', () => {
        cy.screenshot('custom name');
    });

    it('should attach screenshot diff', () => {
        cy.allure()
            .label('testType', 'screenshotDiff')
            .fileAttachment(
                'actual',
                'cypress/fixtures/actual.png',
                'image/png'
            )
            .fileAttachment(
                'expected',
                'cypress/fixtures/expected.png',
                'image/png'
            )
            .fileAttachment('diff', 'cypress/fixtures/diff.png', 'image/png');
    });
});
