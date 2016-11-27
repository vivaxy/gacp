/**
 * @since 2016-11-27 13:59
 * @author vivaxy
 */

import sh from 'shelljs';

import gitBranch from './gitBranch';
import gitRemote from './gitRemote';

const shellSilentConfig = {
    silent: true,
};

const hasCommitInShell = (command) => {
    let result = true;
    const shellExec = sh.exec(command, shellSilentConfig);
    if (shellExec.code === 0) {
        const splitResult = shellExec.stdout.split(`\n\r`);
        if (splitResult[0] === ``) {
            result = false;
        }
    }
    return result;
};

const needPush = () => {
    let result = true;
    if (!gitRemote) {
        result = false;
    } else {
        result = hasCommitInShell(`git log ${gitRemote}/${gitBranch}..${gitBranch} --pretty=format:%H`);
    }
    return result;
};

export default needPush();
