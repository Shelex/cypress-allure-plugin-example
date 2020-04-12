/// <reference types="Cypress" />

import myAssertion from "./myAssertion";

const {
  Given,
  Then
} = require("cypress-cucumber-preprocessor/steps");

Given(`webpack is configured`, () => {});

Then(`this test should work just fine!`, () => {
  myAssertion();
  cy.visit('https://google.com')
});
