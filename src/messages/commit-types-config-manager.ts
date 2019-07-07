/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import * as path from 'path';
import * as fse from 'fs-extra';
// @ts-ignore
import * as rightPad from 'right-pad';

import fileExists from '../files/file-exists';
import { PATHS } from '../configs';

const { GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME } = PATHS;

const userConfigFile = path.join(GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME);

export function read() {
  return require(userConfigFile);
}

export async function write(json: object) {
  return await fse.outputFile(userConfigFile, JSON.stringify(json, null, 2));
}

export async function exist() {
  return await fileExists(userConfigFile);
}

const formatTypeChoices = (map: {
  [key: string]: {
    stat: number;
    description: string;
  };
}) => {
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

export function readListByStatOrder() {
  const userConfig = exports.read();
  const configMap = userConfig.types;
  const configList = formatTypeChoices(configMap);
  configList.sort((prev, next) => {
    return next.stat - prev.stat;
  });
  return configList;
}
