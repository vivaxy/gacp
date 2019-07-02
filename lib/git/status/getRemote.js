/**
 * @since 2016-11-27 14:02
 * @author vivaxy
 */

const getInfoFromShell = require('../../shell/getInfoFromShell.js');

module.exports = async function getRemote() {
  return await getInfoFromShell('git', ['remote']);
};
