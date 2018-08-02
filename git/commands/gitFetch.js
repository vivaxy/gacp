/**
 * @since 2016-11-27 20:07
 * @author vivaxy
 */

const execa = require('execa');

module.exports = async () => {
  return await execa('git', ['fetch', '-p']);
};
