/**
 * @since 2019-06-13 14:14
 * @author vivaxy
 */

const path = require('path');
const log = require('log-util');
const fse = require('fs-extra');
const { GACPHOME, HISTORY_FILE_NAME } = require('../configs/index.js');

const historyFile = path.join(GACPHOME, HISTORY_FILE_NAME);

let cache = null;

function debug(...message) {
  log.debug('gacp:history', ...message);
}

exports.getHistory = function getHistory() {
  debug('reading history');
  if (cache) {
    // already read from file system
    return cache;
  }
  try {
    cache = require(historyFile);
  } catch (e) {
    debug('history file not exists');
    cache = {};
  }
  return cache;
};

exports.setHistory = function(history) {
  debug(`set: ${JSON.stringify(history)}`);
  cache = history || {};
};

exports.clearHistory = function() {
  cache = {};
};

exports.flushHistory = async function() {
  await fse.outputFile(historyFile, JSON.stringify(cache || {}, null, 2));
};
