/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import path from 'path';
import fse from 'fs-extra';

import fileExists from './fileExists';
import { GACPHOME, GITMOJI_CONFIG_FILE_NAME } from '../configs';

const userConfigFile = path.join(GACPHOME, GITMOJI_CONFIG_FILE_NAME);

export const read = () => {
    return require(userConfigFile); // eslint-disable-line global-require, import/no-dynamic-require
};

export const write = async json => {
    return await fse.outputJson(userConfigFile, json);
};

export const exist = async () => {
    return await fileExists(userConfigFile);
};

export const readListByStatOrder = () => {
    const userConfig = read();
    const configList = userConfig.gitmojis;
    configList.sort((prev, next) => {
        return next.stat - prev.stat;
    });
    return configList;
};
