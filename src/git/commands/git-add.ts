/**
 * @since 2016-11-27 14:28
 * @author vivaxy
 */

import * as execa from 'execa';
import * as logger from '../../shell/logger';

export default async function gitAdd() {
  logger.command('git add .');
  return await execa('git', ['add', '.'], {
    stdio: 'inherit',
  });
}
