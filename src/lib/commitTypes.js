/**
 * @since 2017-02-04 16:59
 * @author vivaxy
 */

import defaultConfig from 'conventional-commit-types'; // eslint-disable-line import/extensions

import * as configManager from './commitTypesConfigManager';

/**
 *  {
 *      types: {
 *          // ...
 *      }
 *  }
 * @param config - use config info
 * @param statConfig - use stat info
 * @returns {{types}}
 */
const mapConfigWithStat = (config, statConfig = {}) => {
    const typesWithStat = statConfig.types || {};
    const resultTypes = {};
    Object.keys(config.types).forEach((typeKey) => {
        const typeInfo = config.types[typeKey];
        const typeInfoWithStat = typesWithStat[typeKey];
        resultTypes[typeKey] = { ...typeInfo, stat: typeInfoWithStat ? typeInfoWithStat.stat : 0 };
    });
    return { types: resultTypes };
};

const hasNewTypes = () => {
    const { types } = configManager.read();
    return Object.keys(defaultConfig.types).length !== Object.keys(types).length;
};

const useNewTypesConfig = async() => {
    const currentConfig = configManager.read();
    await configManager.write(mapConfigWithStat(defaultConfig, currentConfig));
};

const ensureTypesConfig = async() => {
    if (!await configManager.exist()) {
        // map config with `stat: 0`
        await configManager.write(mapConfigWithStat(defaultConfig));
    }
    if (hasNewTypes()) {
        await useNewTypesConfig();
    }
};

export const getCommitTypes = async() => {
    await ensureTypesConfig();

    const commitTypes = await configManager.readListByStatOrder();
    return commitTypes.map((type) => {
        const { name, value } = type;
        return { name, value };
    });
};

export const updateTypesStat = async(typeKey) => {
    const { types } = configManager.read();
    types[typeKey].stat++;
    await configManager.write({ types });
};
