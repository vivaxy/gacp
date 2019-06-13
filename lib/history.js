/**
 * @since 2019-06-13 14:14
 * @author vivaxy
 */

const path = require('path');
const debug = require('debug');
const fse = require('fs-extra');
const { GACPHOME, HISTORY_FILE_NAME } = require('../configs/index.js');

const historyFile = path.join(GACPHOME, HISTORY_FILE_NAME);
const debugHistory = debug('history');

exports.getHistory = async function() {
  debugHistory('reading history');
  try {
    return require(historyFile);
  } catch (e) {
    debugHistory('read fail');
    return {};
  }
};

exports.setHistory = async function(history) {
  debugHistory(`write: ${JSON.stringify(history)}`);
  await fse.outputFile(historyFile, JSON.stringify(history, null, 2));
};
