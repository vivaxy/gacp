/**
 * @since 2016-11-17 11:36
 * @author vivaxy
 */

import path from 'path';
import fsp from 'fs-promise';
import rightPad from 'right-pad';

import fileExists from './fileExists';
import { GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME } from '../configs';

const userConfigFile = path.join(GACPHOME, COMMIT_TYPES_CONFIG_FILE_NAME);

export const read = () => {
    return require(userConfigFile);
};

export const write = async(json) => {
    return await fsp.outputJson(userConfigFile, json);
};

export const exist = async() => {
    return await fileExists(userConfigFile);
};

const formatTypeChoices = (map) => {

    let length = 0;

    const keys = Object.keys(map);

    keys.forEach((item) => {
        if (item.length > length) {
            length = item.length;
        }
    });

    return keys.map((key) => {
        return {
            name: `${rightPad(`${key}:`, length)} ${map[key].description}`,
            value: key,
            stat: map[key].stat,
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
