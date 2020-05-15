/**
 * @since 2016-11-27 13:59
 * @author vivaxy
 */
import * as execa from 'execa';
import * as git from '@vivaxy/git';

async function hasCommitInShell(
  file: string,
  args: string[],
): Promise<boolean> {
  let result = true;
  try {
    const { exitCode, stdout } = await execa(file, args);
    if (exitCode === 0) {
      const splitResult = stdout.split('\n\r');
      if (splitResult[0] === '') {
        result = false;
      }
    }
  } catch (ex) {
    // fatal: ambiguous argument 'remote/sonar..sonar': unknown revision or path not in the working tree.
    // Use '--' to separate paths from revisions, like this:
    // 'git <command> [<revision>...] -- [<file>...]'
    // remote branch not exits
    // result = true;
  }
  return result;
}

export default async function checkNeedPush({
  cwd,
}: {
  cwd: string;
}): Promise<boolean> {
  let result = true;
  const remote = await git.getCurrentRemote({ cwd });
  if (!remote) {
    result = false;
  } else {
    const branch = await git.getCurrentBranch({ cwd });
    result = await hasCommitInShell('git', [
      'log',
      `${remote}/${branch}..${branch}`,
      '--pretty=format:%H',
    ]);
  }
  return result;
}
