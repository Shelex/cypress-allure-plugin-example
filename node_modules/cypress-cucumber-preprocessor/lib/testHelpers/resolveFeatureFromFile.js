/* eslint-disable global-require */
/* global jest */
const fs = require("fs");

const { createTestsFromFeature } = require("../createTestsFromFeature");

const resolveFeatureFromFile = featureFile => {
  const spec = fs.readFileSync(featureFile);
  createTestsFromFeature(featureFile, spec);
};

module.exports = {
  resolveFeatureFromFile
};
