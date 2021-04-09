describe('Allure steps', () => {
    it('could be started and finished with startStep, endStep', () => {
        cy.allure()
            .startStep('first')
            .endStep()
            .startStep('second')
            .endStep()
            .startStep('third')
            .endStep();

        cy.allure()
            .startStep('forth')
            .startStep('inside-forth-1')
            .endStep()
            .endStep();

        cy.allure()
            .startStep('fifth')
            .then(() => {
                expect(true).to.be.eq(true);
            });
        cy.allure().endStep();
    });

    it('could be started for current test with step and finished automatically', () => {
        cy.allure().step('first').step('second').step('third');
    });

    it('could be started for current executable with log step, or step(name,false) and finish automatically', () => {
        cy.allure()
            .logStep('first')
            .step('second')
            .logStep('inside-second-1')
            .logStep('inside-second-2')
            .step('third')
            .step('inside-third-1', false);
    });
});
