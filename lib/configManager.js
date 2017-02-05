/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import path from 'path';
import fsp from 'fs-promise';

import fileExists from './fileExists';
import { GACPHOME, CONFIG_FILE_NAME } from '../configs';

const userConfigFile = path.join(GACPHOME, CONFIG_FILE_NAME);

export const read = () => {
    return require(userConfigFile);
};

export const write = async(json) => {
    return await fsp.outputJson(userConfigFile, json);
};

export const exist = async() => {
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
