/**
 * @since 2016-11-27 20:07
 * @author vivaxy
 */

import * as execa from 'execa';

export default async function gitFetch() {
  return await execa('git', ['fetch', '-p'], {
    stdio: 'inherit',
  });
}
