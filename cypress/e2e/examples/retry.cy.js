// feature implemented in cypress-allure-plugin by @mmisty
// sample provided from plugin repository tests

describe('Allure retry', () => {
    const html = `
    <html>
    <head></head>
    <body>
        <div>test</div>
    </body>
    </html>
    `;

    it('test with retries', { retries: 2 }, function () {
        cy.intercept('mytest.com', { body: html });
        cy.visit('mytest.com');
        cy.allure().descriptionHtml(html);
        // eslint-disable-next-line no-invalid-this
        if (this.test._currentRetry < this.test.retries()) {
            cy.wrap('Fail during test with retry').then((t) => {
                throw new Error(t);
            });
        }
    });

    it(
        'test with retries (no screenshots for retries)',
        {
            retries: 2,
            env: {
                allureOmitPreviousAttemptScreenshots: true
            }
        },
        function () {
            cy.intercept('mytest.com', { body: html });
            cy.visit('mytest.com');
            cy.allure().descriptionHtml(html);
            cy.get('body').screenshot('test-retry-screenshot');

            // eslint-disable-next-line no-invalid-this
            if (this.test._currentRetry < this.test.retries()) {
                cy.wrap('Fail during test with retry').then((t) => {
                    throw new Error(t);
                });
            }
        }
    );

    it(
        'test with retries - fail (no screenshots for retries)',
        {
            retries: 2,
            env: {
                allureOmitPreviousAttemptScreenshots: true
            }
        },
        function () {
            cy.intercept('mytest.com', { body: html });
            cy.visit('mytest.com');
            cy.allure().descriptionHtml(html);
            cy.wrap('Fail during test with retry').then((t) => {
                throw new Error(t);
            });
        }
    );

    it('passed test no retries', () => {
        cy.intercept('mytest.com', { body: html });
        cy.visit('mytest.com');
        cy.allure().descriptionHtml(html);
    });

    it('failed test no retries', function () {
        cy.intercept('mytest.com', { body: html });
        cy.visit('mytest.com');
        cy.allure().descriptionHtml(html);
        cy.wrap('Fail during test with retry').then((t) => {
            throw new Error(t);
        });
    });
});
