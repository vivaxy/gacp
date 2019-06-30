/**
 * @since 2016-11-27 15:36
 * @author vivaxy
 */

const fs = require('fs');

module.exports = async function fileExists(filename) {
  return await new Promise(function(resolve) {
    fs.access(filename, function(err) {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
