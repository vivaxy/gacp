/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import * as path from 'path';
import * as fse from 'fs-extra';

import fileExists from '../files/file-exists';
import { PATHS } from '../configs';

export interface GitmojiConfigItem {
  emoji: string;
  code: string;
  description: string;
}

export type GitmojiConfigItemWithStat = GitmojiConfigItem & {
  stat: number;
};

export interface GitmojiConfig {
  gitmojis: GitmojiConfigItem[];
}

export interface GitmojiConfigWithStat {
  gitmojis: GitmojiConfigItemWithStat[];
}

const { GACPHOME, GITMOJI_CONFIG_FILE_NAME } = PATHS;
const userConfigFile = path.join(GACPHOME, GITMOJI_CONFIG_FILE_NAME);

export function read(): GitmojiConfigWithStat {
  return require(userConfigFile);
}

export async function write(json: object) {
  return await fse.outputFile(userConfigFile, JSON.stringify(json, null, 2));
}

export async function exist() {
  return await fileExists(userConfigFile);
}

export function readListByStatOrder() {
  const userConfig = read();
  const configList = userConfig.gitmojis;
  configList.sort((prev, next) => {
    return next.stat - prev.stat;
  });
  return configList;
}
