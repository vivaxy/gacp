/**
 * @since 2016-11-27 13:49
 * @author vivaxy
 */

import getInfoFromShell from '../../lib/getInfoFromShell';

export default async () => {
  const statusOutput = await getInfoFromShell('git', ['status', '-s']);
  return statusOutput === '';
};
