/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import execa from '@vivaxy/execa-process-log';
import * as logger from '../../lib/logger';

export default async () => {
  logger.command(`git add .`);
  return await execa('git', ['add', '.']);
};
