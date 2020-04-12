const glob = require("glob");
const { getConfig } = require("./getConfig");
const stepDefinitionPath = require("./stepDefinitionPath.js");
const { getStepDefinitionPathsFrom } = require("./getStepDefinitionPathsFrom");

const getStepDefinitionsPaths = filePath => {
  let paths = [];
  const config = getConfig();
  if (config && config.nonGlobalStepDefinitions) {
    const nonGlobalPattern = `${getStepDefinitionPathsFrom(
      filePath
    )}/**/*.+(js|ts)`;
    const commonPath = config.commonPath || `${stepDefinitionPath()}/common/`;
    const commonDefinitionsPattern = `${commonPath}**/*.+(js|ts)`;
    paths = paths.concat(glob.sync(nonGlobalPattern));
    paths = paths.concat(glob.sync(commonDefinitionsPattern));
  } else {
    const pattern = `${stepDefinitionPath()}/**/*.+(js|ts)`;
    paths = paths.concat(glob.sync(pattern));
  }
  return paths;
};

module.exports = { getStepDefinitionsPaths };
