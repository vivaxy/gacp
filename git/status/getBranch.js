/**
 * @since 2016-11-27 14:02
 * @author vivaxy
 */

const getInfoFromShell = require('../../lib/getInfoFromShell.js');

module.exports = async () => {
  return await getInfoFromShell('git', ['symbolic-ref', '--short', 'HEAD']);
};
