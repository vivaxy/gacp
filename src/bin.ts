#!/usr/bin/env node
/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
import chalk from 'chalk';
import * as yargs from 'yargs';
import * as log from 'log-util';
import * as cosmiconfig from 'cosmiconfig';
import * as updateNotifier from 'update-notifier';

import gacp from './gacp';
import { flushHistory } from './messages/history';
import { EMOJI_TYPES } from './configs';

const pkg = require('../package.json');

function debug(...message: any[]) {
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
        desc: 'run git push',
        default: true,
      },
      emoji: {
        type: 'string',
        desc: 'use emoji or code',
        choices: ['code', 'emoji'],
        default: 'code',
      },
      logLevel: {
        type: 'number',
        desc: 'log level',
        default: 1,
      },
      cwd: {
        type: 'string',
        desc: 'working directory',
        default: process.cwd(),
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
    const { logLevel, cwd, emoji, push } = yargs.argv;
    log.setLevel(logLevel as number);
    await gacp({
      cwd: cwd as string,
      emoji: emoji as EMOJI_TYPES,
      push: push as boolean,
    });
  } catch (e) {
    log.error(e.message);
    log.debug(e.stack);
    await flushHistory();
    process.exit(1);
  }
})();
