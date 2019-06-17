/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const debug = require('debug');
const cosmiconfig = require('cosmiconfig');
const updateNotifier = require('update-notifier');

const pkg = require('../package.json');
const command = require('./command.js');

const debugCli = debug('cli');

async function configureYargs() {
  const explorer = cosmiconfig(pkg.name);
  const cosmiconfigResult = await explorer.search();
  debugCli('cosmiconfig.search:', cosmiconfigResult);
  const { config = {} } = cosmiconfigResult || {};
  debugCli('config:', config);

  return yargs
    .options({
      push: {
        alias: 'p',
        describe: 'run git push',
        default: true,
      },
      emoji: {
        alias: 'e',
        describe: 'use emoji or code',
        choices: ['code', 'emoji'],
        default: 'code',
      },
    })
    .config(config)
    .help()
    .version().argv._;
}

(async function() {
  updateNotifier({ pkg }).notify();
  await configureYargs();
  command(yargs.argv).catch((ex) => {
    throw ex;
  });
})();
