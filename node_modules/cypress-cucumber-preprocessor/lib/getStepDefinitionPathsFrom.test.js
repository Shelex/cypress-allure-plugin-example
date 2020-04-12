const { getStepDefinitionPathsFrom } = require("./getStepDefinitionPathsFrom");

test("getStepDefinitionPathsFrom", () => {
  expect(
    getStepDefinitionPathsFrom("/home/lgandecki/someComplex_.feature")
  ).equal("/home/lgandecki/someComplex_");
});
