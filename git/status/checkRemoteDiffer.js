/**
 * @since 2016-11-27 14:52
 * @author vivaxy
 */

const getInfoFromShell = require('../../lib/getInfoFromShell.js');

module.exports = async (branch) => {
  const revCount = await getInfoFromShell('git', [
    'rev-list',
    '--count',
    '--left-only',
    `${branch}...HEAD`,
  ]);
  return revCount !== '0';
};
