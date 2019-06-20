#!/usr/bin/env node
/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const debug = require('debug');
const chalk = require('chalk');
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

function notifyUpdate() {
  const notifier = updateNotifier({ pkg });
  const { update } = notifier;
  if (update) {
    const installCommand = `npm i -g ${update.name}`;
    const message =
      'Update available ' +
      chalk.dim(update.current) +
      chalk.reset(' → ') +
      chalk.green(update.latest) +
      ' \nRun ' +
      chalk.cyan(installCommand) +
      ' to update';

    notifier.notify({ message });
  }
}

(async function() {
  try {
    notifyUpdate();
    await configureYargs();
    await command(yargs.argv);
  } catch (e) {
    throw e;
  }
})();
