/**
 * @since 2016-11-27 14:52
 * @author vivaxy
 */

import getShellInfo from '../../shell/get-info';

export default async function checkRemoteDiffers(
  branch: string,
): Promise<boolean> {
  const revCount = await getShellInfo('git', [
    'rev-list',
    '--count',
    '--left-only',
    `${branch}...HEAD`,
  ]);
  return revCount !== '0';
}
