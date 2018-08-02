/**
 * @since 2016-11-27 15:36
 * @author vivaxy
 */

const fs = require('fs');

module.exports = async (filename) => {
  return await new Promise((resolve) => {
    fs.access(filename, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
