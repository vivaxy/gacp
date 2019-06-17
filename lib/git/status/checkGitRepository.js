/**
 * @since 2016-11-22 16:05
 * @author vivaxy
 */

const path = require('path');

const directoryExists = require('../../files/directoryExists.js');
const getInfoFromShell = require('../../shell/getInfoFromShell.js');

const cwd = process.cwd();

module.exports = async () => {
  const gitExists = await directoryExists(path.join(cwd, '.git'));
  if (gitExists) {
    const isInWorkTree = await getInfoFromShell('git', [
      'rev-parse',
      '--is-inside-work-tree',
    ]);
    if (isInWorkTree === 'true') {
      return true;
    }
  }
  return false;
};
