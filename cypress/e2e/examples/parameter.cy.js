describe('Allure parameters', () => {
    const cases = [
        { number: 1, message: 'hello' },
        { number: 2, message: 'world' }
    ];

    cases.forEach((caseData) => {
        it(`should attach testParameter number ${caseData.number} to test`, () => {
            cy.allure()
                .startStep('parameters should not be in this step')
                .testParameter('number', caseData.number)
                .testParameter('message', caseData.message);
        });
    });

    cases.forEach((caseData) => {
        it(`should attach parameter number ${caseData.number} to step`, () => {
            cy.allure()
                .startStep('parameters should be in this step')
                .parameter('number', caseData.number)
                .parameter('message', caseData.message);
        });
    });
});
