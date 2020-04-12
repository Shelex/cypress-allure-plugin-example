const { CucumberDataCollector } = require("./cukejson/cucumberDataCollector");
const { createTestFromScenarios } = require("./createTestFromScenario");
const { shouldProceedCurrentStep, getEnvTags } = require("./tagsHelper");

const createTestsFromFeature = (filePath, spec) => {
  const testState = new CucumberDataCollector(filePath, spec);
  const featureTags = testState.feature.tags;
  const hasEnvTags = !!getEnvTags();
  const sectionsWithTags = testState.feature.children.filter(
    section => section.tags && section.tags.length
  );

  const sectionsWithTagsExist = sectionsWithTags.length > 0;

  let everythingShouldRun = false;
  let featureShouldRun = false;
  let taggedScenarioShouldRun = false;
  let anyFocused = false;
  if (hasEnvTags) {
    featureShouldRun = shouldProceedCurrentStep(featureTags);
    taggedScenarioShouldRun = testState.feature.children.some(
      section =>
        section.tags &&
        section.tags.length &&
        shouldProceedCurrentStep(section.tags.concat(featureTags))
    );
  } else if (!sectionsWithTagsExist) {
    everythingShouldRun = true;
  } else {
    anyFocused = sectionsWithTags.some(section =>
      section.tags.find(t => t.name === "@focus")
    );
    if (anyFocused) {
      taggedScenarioShouldRun = true;
    } else {
      everythingShouldRun = true;
    }
  }

  // eslint-disable-next-line prefer-arrow-callback
  if (everythingShouldRun || featureShouldRun || taggedScenarioShouldRun) {
    const backgroundSection = testState.feature.children.find(
      section => section.type === "Background"
    );
    const otherSections = testState.feature.children.filter(
      section => section.type !== "Background"
    );
    const scenariosToRun = otherSections.filter(section => {
      let shouldRun;
      if (anyFocused) {
        shouldRun = section.tags.find(t => t.name === "@focus");
      } else {
        shouldRun =
          everythingShouldRun ||
          shouldProceedCurrentStep(section.tags.concat(featureTags)); // Concat handles inheritance of tags from feature
      }
      return shouldRun;
    });
    createTestFromScenarios(scenariosToRun, backgroundSection, testState);
  }
};

module.exports = {
  createTestsFromFeature
};
