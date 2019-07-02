const load = require('@commitlint/load');

exports.getCommitlintConfigRules = async () => {
  let rules;
  try {
    rules = await load().then((config) => config.rules);
  } catch (e) {
    rules = {};
  }
  return rules;
};

exports.getRuleValue = ([level, , value], defaultValue) => {
  return level === 2 ? value : defaultValue;
};
