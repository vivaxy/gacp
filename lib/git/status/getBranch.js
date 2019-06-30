/**
 * @since 2016-11-27 14:02
 * @author vivaxy
 */

const getInfoFromShell = require('../../shell/getInfoFromShell.js');

module.exports = async function getBranch() {
  return await getInfoFromShell('git', ['symbolic-ref', '--short', 'HEAD']);
};
