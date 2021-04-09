const cypress = require('cypress');

const cypressConfig = {
    video: false,
    browser: 'chrome',
    config: {
        integrationFolder: 'cypress/integration/examples'
    },
    env: {
        allure: true
    }
};

const cypressCucumberConfig = {
    ...cypressConfig,
    ...{
        config: {
            integrationFolder: 'cypress/integration/cucumber',
            ignoreTestFiles: '*.js',
            testFiles: '**/*.{feature,features}'
        }
    }
};

(async function () {
    await cypress.run(cypressConfig);
    await cypress.run(cypressCucumberConfig);
})();
