/**
 * @since 2017-02-04 16:59
 * @author vivaxy
 */
import * as configManager from './commit-types-config-manager';

const defaultConfig = require('conventional-commit-types');

interface ConfigItem {
  description: string;
  title: string;
}

type ConfigItemWithStat = ConfigItem & {
  stat: number;
};

interface Config {
  types: {
    [type: string]: ConfigItem;
  };
}

interface ConfigWithStat {
  types: {
    [type: string]: ConfigItemWithStat;
  };
}

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
function mapConfigWithStat(
  config: ConfigWithStat,
  statConfig: ConfigWithStat = { types: {} },
): ConfigWithStat {
  const typesWithStat = statConfig.types;
  const resultTypes: {
    [key: string]: {
      description: string;
      title: string;
      stat: number;
    };
  } = {};
  Object.keys(config.types).forEach((typeKey: string) => {
    const typeInfo = config.types[typeKey];
    const typeInfoWithStat = typesWithStat[typeKey];
    resultTypes[typeKey] = {
      ...typeInfo,
      stat: typeInfoWithStat ? typeInfoWithStat.stat : 0,
    };
  });
  return { types: resultTypes };
}

function hasNewTypes() {
  const { types } = configManager.read();
  return Object.keys(defaultConfig.types).length !== Object.keys(types).length;
}

async function useNewTypesConfig() {
  const currentConfig = configManager.read();
  await configManager.write(mapConfigWithStat(defaultConfig, currentConfig));
}

async function ensureTypesConfig() {
  if (!(await configManager.exist())) {
    // map config with `stat: 0`
    await configManager.write(mapConfigWithStat(defaultConfig));
  }
  if (hasNewTypes()) {
    await useNewTypesConfig();
  }
}

export async function getCommitTypes() {
  await ensureTypesConfig();

  const commitTypes = await configManager.readListByStatOrder();
  return commitTypes.map(({ title, value }) => {
    return { title, value };
  });
}

export async function updateTypesStat(typeKey: string) {
  const { types } = configManager.read();
  types[typeKey].stat++;
  await configManager.write({ types });
}
