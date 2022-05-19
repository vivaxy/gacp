#!/usr/bin/env node
/**
 * @since 2016-11-22 13:29
 * @author vivaxy
 */
import * as yargs from 'yargs';
import chalk = require('chalk');
import * as log from 'log-util';
import { cosmiconfig } from 'cosmiconfig';
import * as updateNotifier from 'update-notifier';

import gacp from './gacp';
import { flushHistory } from './messages/history';
import { EMOJI_TYPES } from './configs';

const pkg = require('../package.json');

function debug(...message: any[]) {
  log.debug('gacp:bin', ...message);
}

async function configureYargs() {
  const explorer = cosmiconfig(pkg.name);
  const cosmiconfigResult = await explorer.search();
  const { config = {} } = cosmiconfigResult || {};
  ((yargs
    .options({
      add: {
        type: 'boolean',
        desc: 'run git add .',
        default: true,
      },
      push: {
        type: 'boolean',
        desc: 'run git push',
        default: true,
      },
      emoji: {
        type: 'string',
        desc: 'use emoji or code',
        choices: ['none', 'code', 'emoji'],
        default: 'code',
      },
      editor: {
        type: 'boolean',
        desc: 'use node external editor in longer description',
        default: false,
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
      verify: {
        type: 'boolean',
        desc: 'verify git commit and git push',
        default: true,
      },
    })
    .config(config)
    .help()
    .version().argv as unknown) as any)._;

  const hooks = config.hooks || {};
  return {
    hooks: {
      postpush: hooks.postpush || '',
    },
  };
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

(async function () {
  try {
    notifyUpdate();
    const extraConfigs = await configureYargs();
    const {
      logLevel,
      cwd,
      emoji,
      add,
      push,
      verify,
      editor,
    } = (yargs.argv as unknown) as {
      logLevel: number;
      cwd: string;
      emoji: EMOJI_TYPES;
      add: boolean;
      push: boolean;
      verify: boolean;
      editor: boolean;
    };
    log.setLevel(logLevel);
    await gacp({
      cwd: cwd as string,
      add: add as boolean,
      push: push as boolean,
      emoji: emoji as EMOJI_TYPES,
      editor: editor as boolean,
      verify: verify as boolean,
      hooks: {
        postpush: extraConfigs.hooks.postpush,
      },
    });
    await flushHistory();
  } catch (e) {
    log.error(e.message);
    log.debug(e.stack);
    await flushHistory();
    process.exit(1);
  }
})();
