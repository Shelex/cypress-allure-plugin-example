import assert from "assert";

const myAssertion = (): uselessType => {
  assert(true);
  return { uselessKey: "" };
};

type uselessType = {
  uselessKey: String;
};

export default myAssertion;
