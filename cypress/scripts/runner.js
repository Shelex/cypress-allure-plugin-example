const cypress = require('cypress');

const cypressConfig = {
    video: false,
    browser: 'chrome',
    config: {
        specPattern: 'cypress/e2e/examples/**',
        excludeSpecPattern: '*.feature'
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
            excludeSpecPattern: '**/*.js'
        }
    }
};

(async function () {
    await cypress.run(cypressConfig);
    await cypress.run(cypressCucumberConfig);
})();
