/**
 * @since 2016-11-22 16:05
 * @author vivaxy
 */

import path from 'path';

import directoryExists from '../../lib/directoryExists';
import getInfoFromShell from '../../lib/getInfoFromShell';

const cwd = process.cwd();

export default async () => {
  const gitExists = await directoryExists(path.join(cwd, '.git'));
  if (gitExists) {
    const isInWorkTree = await getInfoFromShell('git', [
      'rev-parse',
      '--is-inside-work-tree'
    ]);
    if (isInWorkTree === 'true') {
      return true;
    }
  }
  return false;
};
