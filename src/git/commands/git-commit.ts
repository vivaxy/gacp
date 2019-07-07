/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import * as execa from 'execa';
import * as logger from '../../shell/logger';

export default async function gitCommit(commitMessage: string) {
  logger.command(`git commit -m ${commitMessage}`);
  return await execa('git', ['commit', '-m', commitMessage], {
    stdio: 'inherit',
  });
}
