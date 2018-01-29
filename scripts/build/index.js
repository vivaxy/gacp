/**
 * @since 2017-03-18 11:04:07
 * @author vivaxy
 */

import babel from './babel';
import copy from './copy';

(async () => {
    await babel();
    await copy();
})();
