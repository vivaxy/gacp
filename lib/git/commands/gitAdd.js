/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

const execa = require('execa');
const logger = require('../../shell/logger.js');

module.exports = async function gitAdd() {
  logger.command('git add .');
  return await execa('git', ['add', '.'], {
    stdio: 'inherit',
  });
};
