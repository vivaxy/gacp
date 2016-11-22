/**
 * @since 2016-11-22 16:04
 * @author vivaxy
 */

import sh from 'shelljs';

const shellSilentConfig = {
    silent: true,
};

export default (command) => {
    let result = null;
    const shellExec = sh.exec(command, shellSilentConfig);
    if (shellExec.code === 0) {
        result = shellExec.stdout.split(`\n`)[0];
    }
    return result;
};
