/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

const execa = require('@vivaxy/execa-process-log').default;
const logger = require('../../shell/logger.js');

module.exports = async () => {
  logger.command('git add .');
  return await execa('git', ['add', '.']);
};
