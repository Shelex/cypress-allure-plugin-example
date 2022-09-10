const cypress = require('cypress');

const cypressConfig = {
    video: false,
    browser: 'chrome',
    config: {
        specPattern: 'specPattern=cypress/e2e/examples/**'
    },
    env: {
        allure: true,
        allureReuseAfterSpec: true
    }
};

const cypressCucumberConfig = {
    ...cypressConfig,
    ...{
        config: {
            specPattern: 'cypress/e2e/cucumber/*.feature',
            excludeSpecPattern: '*.js'
        }
    }
};

(async function () {
    await cypress.run(cypressConfig);
    await cypress.run(cypressCucumberConfig);
})();
