/**
 * @since 2016-11-27 15:57
 * @author vivaxy
 */

import * as fs from 'fs';

export default async function directoryExists(filename: string) {
  return await new Promise(function(resolve) {
    fs.stat(filename, function(err, stats) {
      if (err) {
        resolve(false);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
}
