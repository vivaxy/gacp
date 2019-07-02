/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');

const fileExists = require('../files/fileExists.js');
const { GACPHOME, GITMOJI_CONFIG_FILE_NAME } = require('../configs');

const userConfigFile = path.join(GACPHOME, GITMOJI_CONFIG_FILE_NAME);

exports.read = () => {
  return require(userConfigFile);
};

exports.write = async (json) => {
  return await fse.outputFile(userConfigFile, JSON.stringify(json, null, 2));
};

exports.exist = async () => {
  return await fileExists(userConfigFile);
};

exports.readListByStatOrder = () => {
  const userConfig = exports.read();
  const configList = userConfig.gitmojis;
  configList.sort((prev, next) => {
    return next.stat - prev.stat;
  });
  return configList;
};
