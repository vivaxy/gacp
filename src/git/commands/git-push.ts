/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

import * as execa from 'execa';

import GacpError from '../../errors/gacp';
import getRemote from '../status/get-remote';
import getBranch from '../status/get-branch';
import * as logger from '../../shell/logger';
import checkRemoteDiffers from '../status/check-remote-differs';

export default async function gitPush() {
  const branch = await getBranch();

  const remoteDiffer = await checkRemoteDiffers(branch);
  if (remoteDiffer) {
    throw new GacpError('Remote differ, please pull changes.');
  }

  const remote = await getRemote();
  if (!remote) {
    throw new GacpError('No tracking remote.');
  }
  logger.command(`git push ${remote} ${branch} --follow-tags`);
  return await execa('git', ['push', remote, branch, '--follow-tags'], {
    stdio: 'inherit',
  });
}
