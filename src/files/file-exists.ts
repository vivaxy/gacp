/**
 * @since 2016-11-27 15:36
 * @author vivaxy
 */

import * as fs from 'fs';

export default async function fileExists(filename: string) {
  return await new Promise(function(resolve) {
    fs.access(filename, function(err) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
