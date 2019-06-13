/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const updateNotifier = require('update-notifier');

const pkg = require('../package.json');
const index = require('../commands/index.js');

const configureYargs = () => {
  return yargs.help().version().argv._;
};

configureYargs();
updateNotifier({ pkg }).notify();
index().catch((ex) => {
  throw ex;
});
