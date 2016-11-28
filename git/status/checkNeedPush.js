/**
 * @since 2016-11-27 13:59
 * @author vivaxy
 */

import execa from '../../lib/wrappedExeca';

import getBranch from './getBranch';
import getRemote from './getRemote';

const hasCommitInShell = async(file, args) => {
    let result = true;
    const {code, stdout} = await execa(file, args);
    if (code === 0) {
        const splitResult = stdout.split(`\n\r`);
        if (splitResult[0] === ``) {
            result = false;
        }
    } else {
        // fatal: ambiguous argument 'remote/sonar..sonar': unknown revision or path not in the working tree.
        // Use '--' to separate paths from revisions, like this:
        // 'git <command> [<revision>...] -- [<file>...]'
        // remote branch not exits
        result = true;
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
