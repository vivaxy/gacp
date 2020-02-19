/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */
import * as git from '@vivaxy/git';

import GacpError from '../../errors/gacp';
import * as logger from '../../shell/logger';

export default async function gitPush({ cwd }: { cwd: string }) {
  const branch = await git.getCurrentBranch({ cwd });

  const remoteDiffer =
    (await git.getRevCount({
      from: branch,
      leftOnly: true,
      cwd,
    })) !== 0;
  if (remoteDiffer) {
    throw new GacpError('Remote differ, please pull changes.');
  }

  const remote = await git.getCurrentRemote({ cwd });
  if (!remote) {
    throw new GacpError('No tracking remote.');
  }
  logger.command(`git push ${remote} ${branch} --follow-tags`);
  await git.push({ cwd });
}
