/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

const execa = require('execa');
const logger = require('../../shell/logger.js');

module.exports = async function gitCommit(commitMessage) {
  logger.command(`git commit -m ${commitMessage}`);
  return await execa('git', ['commit', '-m', commitMessage], {
    stdio: 'inherit',
  });
};
