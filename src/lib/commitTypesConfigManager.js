/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import path from 'path';
import fse from 'fs-extra';
import rightPad from 'right-pad';

import fileExists from './fileExists';
import { GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME } from '../configs';

const userConfigFile = path.join(GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME);

export const read = () => {
  return require(userConfigFile); // eslint-disable-line global-require, import/no-dynamic-require
};

export const write = async json => {
  return await fse.outputJson(userConfigFile, json);
};

export const exist = async () => {
  return await fileExists(userConfigFile);
};

const formatTypeChoices = map => {
  const keys = Object.keys(map);
  const length = keys.reduce((len, item) => {
    if (item.length > len) {
      return item.length;
    }
    return len;
  }, 0);

  return keys.map(key => {
    return {
      name: `${rightPad(`${key}:`, length)} ${map[key].description}`,
      value: key,
      stat: map[key].stat
    };
  });
};

export const readListByStatOrder = () => {
  const userConfig = read();
  const configMap = userConfig.types;
  const configList = formatTypeChoices(configMap);
  configList.sort((prev, next) => {
    return next.stat - prev.stat;
  });
  return configList;
};
