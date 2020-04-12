const { getConfig } = require("./getConfig");

exports.isNonGlobalStepDefinitionsMode = () => {
  const config = getConfig();
  return config && config.nonGlobalStepDefinitions;
};
