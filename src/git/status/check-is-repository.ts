/**
 * @since 2016-11-22 16:05
 * @author vivaxy
 */

import * as path from 'path';

import getShellInfo from '../../shell/get-info';
import directoryExists from '../../files/directory-exists';

export default async function checkGitRepository({
  cwd,
}: {
  cwd: string;
}): Promise<boolean> {
  const gitExists = await directoryExists(path.join(cwd, '.git'));
  if (gitExists) {
    const isInWorkTree = await getShellInfo('git', [
      'rev-parse',
      '--is-inside-work-tree',
    ]);
    if (isInWorkTree === 'true') {
      return true;
    }
  }
  return false;
}
