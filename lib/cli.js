#!/usr/bin/env node
/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
const yargs = require('yargs');
const chalk = require('chalk');
const log = require('log-util');
const cosmiconfig = require('cosmiconfig');
const updateNotifier = require('update-notifier');

const gacp = require('./gacp.js');
const pkg = require('../package.json');
const { flushHistory } = require('./messages/history.js');

function debug(...message) {
  log.debug('gacp:cli', ...message);
}

async function configureYargs() {
  const explorer = cosmiconfig(pkg.name);
  const cosmiconfigResult = await explorer.search();
  const { config = {} } = cosmiconfigResult || {};
  return yargs
    .options({
      push: {
        type: 'boolean',
        alias: 'p',
        desc: 'run git push',
        default: true,
      },
      emoji: {
        alias: 'e',
        desc: 'use emoji or code',
        choices: ['code', 'emoji'],
        default: 'code',
        type: 'string',
      },
      logLevel: {
        type: 'number',
        desc: 'log level',
        default: 1,
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
    log.setLevel(yargs.argv.logLevel);
    await gacp(yargs.argv);
  } catch (e) {
    log.error(e.message);
    log.debug(e.stack);
    await flushHistory();
    process.exit(1);
  }
})();
