/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import execa from '@vivaxy/execa-process-log';
import * as logger from '../../lib/logger';

export default async commitMessage => {
  logger.command(`git commit -m ${commitMessage}`);
  return await execa('git', ['commit', '-m', commitMessage]);
};
