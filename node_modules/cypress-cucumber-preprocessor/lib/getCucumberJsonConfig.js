const log = require("debug")("cypress:cucumber");
const { getConfig } = require("./getConfig");

exports.getCucumberJsonConfig = () => {
  const config = getConfig();
  const cucumberJson =
    config && config.cucumberJson ? config.cucumberJson : { generate: false };
  log("cucumber.json", JSON.stringify(cucumberJson));

  return cucumberJson;
};
