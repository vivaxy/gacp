/**
 * @since 2016-11-27 13:49
 * @author vivaxy
 */

const getInfoFromShell = require('../../lib/getInfoFromShell.js');

module.exports = async () => {
  const statusOutput = await getInfoFromShell('git', ['status', '-s']);
  return statusOutput === '';
};
