describe('Allure executor info', () => {
    it('should write executors.json file', () => {
        const currentHour = new Date().getHours();
        cy.allure().writeExecutorInfo({
            name: 'Allure report for examples',
            type: 'github action', // available icons: default, github action, jenkins, bamboo, teamcity
            // url: 'https://shelex.github.io/cypress-allure-plugin-example/allure-report/url',
            buildOrder: currentHour, // in case buildOrders are same - it will count as retry
            buildName: 'CI RUN',
            buildUrl:
                'https://github.com/Shelex/cypress-allure-plugin-example/actions/workflows/allure.yaml' // link to CI build
            // reportUrl:
            //     'https://shelex.github.io/cypress-allure-plugin-example/allure-report/reportUrl', // link to report
            // reportName: 'reportName'
        });
    });
});
