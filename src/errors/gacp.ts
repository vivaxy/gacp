/**
 * @since 2018-01-29 14:55
 * @author vivaxy
 */

import { ERROR_TYPES } from '../configs';

export default class GacpError extends Error {
  readonly type: ERROR_TYPES;

  constructor(message: string) {
    super(message);
    this.type = ERROR_TYPES.GACP;
  }
}
