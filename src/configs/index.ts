/**
 * @since 2017-02-04 17:05
 * @author vivaxy
 */
import gitmojisConfig from './gitmojis';

const { HOME, HOMEPATH, USERPROFILE } = process.env;

export const PATHS = {
  GACPHOME: `${HOME || HOMEPATH || USERPROFILE}/.gacp`,
  // from https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json
  GITMOJI_CONFIG_FILE_NAME: 'gitmojis.json',
  // from conventional-commit-types
  COMMIT_TYPES_CONFIG_FILE_NAME: 'conventional-commit-types.json',
  HISTORY_FILE_NAME: 'history.json',
};

const { gitmojis: GITMOJIS } = gitmojisConfig;
export { GITMOJIS };

export enum ERROR_TYPES {
  GACP = 'gacp',
}

export enum EMOJI_TYPES {
  EMOJI = 'emoji',
  CODE = 'code',
  NONE = 'none',
}
