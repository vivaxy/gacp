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

export interface History {
  type: string;
  scope: string;
  gitmoji: string;
  subject: string;
  body: string;
  footer: string;
}

let cache: History | null = null;

const defaultCache = {
  type: '',
  scope: '',
  gitmoji: '',
  subject: '',
  body: '',
  footer: '',
};

function debug(...message: any[]) {
  log.debug('gacp:history', ...message);
}

export function getHistory(): History {
  debug('reading history');
  if (cache) {
    // already read from file system
    return cache;
  }
  try {
    cache = require(historyFile) as History;
  } catch (e) {
    debug('history file not exists');
    cache = defaultCache;
  }
  return cache;
}

export function setHistory(history: History) {
  debug(`set: ${JSON.stringify(history)}`);
  cache = history || {};
}

export function clearHistory() {
  cache = defaultCache;
}

export async function flushHistory() {
  await fse.outputFile(historyFile, JSON.stringify(cache || {}, null, 2));
}
