/**
 * @since 2018-01-29 14:55
 * @author vivaxy
 */

const errorTypes = require('../configs/errorTypes.js');

module.exports = class GacpError extends Error {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.type = errorTypes.GACP;
  }
};
