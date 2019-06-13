/**
 * @since 2019-06-13 14:14
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');
const {
  GACPHOME,
  COMMIT_TYPES_CONFIG_FILE_NAME,
} = require('../configs/index.js');
const historyFile = path.join(GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME);

exports.getHistory = async function() {
  try {
    return require(historyFile);
  } catch (e) {
    return {};
  }
};

exports.setHistory = async function(history) {
  await fse.outputFile(historyFile, JSON.stringify(history, null, 2));
};
