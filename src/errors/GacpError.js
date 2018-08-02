/**
 * @since 2018-01-29 14:55
 * @author vivaxy
 */

import * as errorTypes from '../configs/errorTypes';

export default class GacpError extends Error {
  constructor(message, fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.type = errorTypes.GACP;
  }
}
