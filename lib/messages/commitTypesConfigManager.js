/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');
const rightPad = require('right-pad');

const fileExists = require('../files/fileExists.js');
const { GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME } = require('../configs');

const userConfigFile = path.join(GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME);

exports.read = () => {
  return require(userConfigFile);
};

exports.write = async (json) => {
  return await fse.outputFile(userConfigFile, JSON.stringify(json, null, 2));
};

exports.exist = async () => {
  return await fileExists(userConfigFile);
};

const formatTypeChoices = (map) => {
  const keys = Object.keys(map);
  const length = keys.reduce((len, item) => {
    if (item.length > len) {
      return item.length;
    }
    return len;
  }, 0);

  return keys.map((key) => {
    return {
      title: `${rightPad(`${key}:`, length)} ${map[key].description}`,
      value: key,
      stat: map[key].stat,
    };
  });
};

exports.readListByStatOrder = () => {
  const userConfig = exports.read();
  const configMap = userConfig.types;
  const configList = formatTypeChoices(configMap);
  configList.sort((prev, next) => {
    return next.stat - prev.stat;
  });
  return configList;
};
