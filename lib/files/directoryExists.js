/**
 * @since 2016-11-27 15:57
 * @author vivaxy
 */

const fs = require('fs');

module.exports = async function directoryExists(filename) {
  return await new Promise(function(resolve) {
    fs.stat(filename, function(err, stats) {
      if (err) {
        resolve(false);
      } else {
        resolve(stats.isDirectory());
      }
    });
  });
};
