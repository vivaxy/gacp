/**
 * @since 2016-11-27 15:57
 * @author vivaxy
 */

import fs from 'fs';

export default async filename => {
  return await new Promise(resolve => {
    fs.stat(filename, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
};
