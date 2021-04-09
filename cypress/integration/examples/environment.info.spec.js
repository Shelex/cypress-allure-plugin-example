describe('Allure Environment info', () => {
    it('should add Environment info', () => {
        const data = {
            magicNumber: 42,
            examples: true
        };

        cy.allure()
            .writeEnvironmentInfo(data)
            .parameter(
                'initial environment info',
                JSON.stringify(data, null, 2)
            );
    });

    it('should overwrite Environment info', () => {
        const data = {
            'cypress-allure-plugin':
                'https://github.com/Shelex/cypress-allure-plugin',
            magicNumber: 42
        };

        cy.allure()
            .writeEnvironmentInfo(data)
            .parameter(
                'should overwrite previous environment info',
                JSON.stringify(data, null, 2)
            );
    });
});
