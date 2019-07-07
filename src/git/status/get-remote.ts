/**
 * @since 2016-11-27 14:02
 * @author vivaxy
 */

import getShellInfo from '../../shell/get-info';

export default async function getRemote(): Promise<string> {
  return await getShellInfo('git', ['remote']);
}
