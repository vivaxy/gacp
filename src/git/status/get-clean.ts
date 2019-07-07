/**
 * @since 2016-11-27 13:49
 * @author vivaxy
 */

import getShellInfo from '../../shell/get-info';

export default async function getClean(): Promise<boolean> {
  const statusOutput = await getShellInfo('git', ['status', '-s']);
  return statusOutput === '';
}
