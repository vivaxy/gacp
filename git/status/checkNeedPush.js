/**
 * @since 2016-11-27 13:59
 * @author vivaxy
 */

import execa from '../../lib/wrappedExeca';

import getBranch from './getBranch';
import getRemote from './getRemote';

const hasCommitInShell = async(...command) => {
    let result = true;
    const shellExec = await execa(...command);
    if (shellExec.code === 0) {
        const splitResult = shellExec.stdout.split(`\n\r`);
        if (splitResult[0] === ``) {
            result = false;
        }
    }
    return result;
};

export default async() => {
    let result = true;
    const remote = await getRemote();
    if (!remote) {
        result = false;
    } else {
        const branch = await getBranch();
        result = await hasCommitInShell(`git`, [`log`, `${remote}/${branch}..${branch}`, `--pretty=format:%H`]);
    }
    return result;
};
