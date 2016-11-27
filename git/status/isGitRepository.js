/**
 * @since 2016-11-22 16:05
 * @author vivaxy
 */

import path from 'path';
import sh from 'shelljs';

import getInfoFromShell from '../../lib/getInfoFromShell';

const cwd = process.cwd();

const check = () => {
    if (sh.test(`-d`, path.join(cwd, `.git`))) {
        if (getInfoFromShell(`git rev-parse --is-inside-work-tree`) === `true`) {
            return true;
        }
    }
    return false;
};

export default check();
