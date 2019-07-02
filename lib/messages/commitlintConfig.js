const load = require('@commitlint/load');

module.exports = async () => {
  let rules;
  try {
    rules = await load().then((config) => config.rules);
  } catch (e) {
    rules = {};
  }
  return rules;
};
