/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

import execa from '@vivaxy/execa-process-log';

import getRemote from '../status/getRemote';
import getBranch from '../status/getBranch';
import checkRemoteDiffer from '../status/checkRemoteDiffer';
import * as logger from '../../lib/logger';
import GacpError from '../../errors/GacpError';

export default async () => {
  const branch = await getBranch();

  const remoteDiffer = await checkRemoteDiffer(branch);
  if (remoteDiffer) {
    throw new GacpError('Remote differ, please pull changes.');
  }

  const remote = await getRemote();
  if (!remote) {
    throw new GacpError('No tracking remote.');
  }
  logger.command(`git push ${remote} ${branch} --follow-tag`);
  return await execa('git', ['push', remote, branch, '--follow-tag']);
};
