# Cypress Allure Plugin Usage Example

This project demonstrates how to use [cypress-allure-plugin](https://github.com/Shelex/cypress-allure-plugin).

## Pre-requisite

-   [Allure](https://docs.qameta.io/allure/#_get_started)  
    It may be [classic solutions with java](https://github.com/allure-framework/allure2#download) or [allure-commandline npm package](https://www.npmjs.com/package/allure-commandline) running binary under the hood.

## How to run:

-   clone this repo
-   run tests: `yarn && yarn cy:run`
-   clear previous output `yarn allure:clear`
-   generate allure report: `yarn allure:report`
-   open report: `allure open`

## Allure report

-   is generated by github action on every push. See [.github/workflows/allure.yaml](.github/workflows/allure.yaml)
-   historical data is preserved, so reports will have nice graphs :)
-   hosted with github pages. Check [allure-report](https://shelex.github.io/cypress-allure-plugin-example/allure-report)

## VS Code for cypress + cucumber

In case you are using VS Code and [Cypress Helper](https://marketplace.visualstudio.com/items?itemName=Shelex.vscode-cy-helper) extension, it has configuration for allure cucumber tags autocompletion available:

```
"cypressHelper.cucumberTagsAutocomplete": {
        "enable": true,
        "allurePlugin": true,
        "tags": ["focus", "someOtherTag"]
    }
```
