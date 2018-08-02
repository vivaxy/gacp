/**
 * @since 2017-02-04 17:05
 * @author vivaxy
 */

exports.GACPHOME = `${process.env.HOME ||
  process.env.HOMEPATH ||
  process.env.USERPROFILE}/.gacp`;

// from https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json
exports.GITMOJI_CONFIG_FILE_NAME = 'gitmojis.json';
// from conventional-commit-types
exports.COMMIT_TYPES_CONFIG_FILE_NAME = 'conventional-commit-types.json';
