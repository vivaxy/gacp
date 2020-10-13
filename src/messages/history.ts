/**
 * @since 2019-06-13 14:14
 * @author vivaxy
 */

import * as path from 'path';
import * as log from 'log-util';
import * as fse from 'fs-extra';
import { PATHS } from '../configs';

const { GACPHOME, HISTORY_FILE_NAME } = PATHS;
const historyFile = path.join(GACPHOME, HISTORY_FILE_NAME);

export interface Messages {
  type: string;
  scope: string;
  gitmoji: string;
  subject: string;
  body: string;
  footer: string;
}

export const DEFAULT_MESSAGES: Messages = {
  type: '',
  scope: '',
  gitmoji: '',
  subject: '',
  body: '',
  footer: '',
};

let cache: Messages;

function debug(...message: any[]) {
  log.debug('gacp:history', ...message);
}

export function getHistory(): Messages {
  debug('reading history');
  if (cache) {
    // already read from file system
    return cache;
  }
  try {
    cache = require(historyFile) as Messages;
  } catch (e) {
    debug('history file not exists');
    cache = DEFAULT_MESSAGES;
  }
  return cache;
}

export function setHistory(history: Partial<Messages>) {
  debug(`set: ${JSON.stringify(history)}`);
  cache = { ...cache, ...history };
}

export function clearHistory() {
  debug(`clear: ${JSON.stringify(DEFAULT_MESSAGES)}`);
  cache = DEFAULT_MESSAGES;
}

export async function flushHistory() {
  debug(`flush: ${JSON.stringify(cache || {})}`);
  await fse.outputFile(historyFile, JSON.stringify(cache || {}, null, 2));
}
