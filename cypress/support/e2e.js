// You can read more here:
// https://on.cypress.io/configuration

import '@shelex/cypress-allure-plugin';
import 'cypress-plugin-api';
import './commands';

if (Cypress.spec.name.includes('test.duplicate.name')) {
    Cypress.Allure.reporter.getInterface().defineHistoryId((title) => {
        return `${Cypress.spec.relative}${title}`;
    });
}
