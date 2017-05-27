/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

import execa from 'execa';

import getRemote from '../status/getRemote';
import getBranch from '../status/getBranch';
import checkRemoteDiffer from '../status/checkRemoteDiffer';

export default async() => {
    const branch = await getBranch();

    const remoteDiffer = await checkRemoteDiffer(branch);
    if (remoteDiffer) {
        throw new Error('remote differ, please pull changes');
    }

    const remote = await getRemote();

    const results = await execa('git', ['push', remote, branch, '--follow-tag'], { stdio: 'inherit' });
    if (results.contains('Enter passphrase for key')) {
        throw new Error('Enter passphrase for key');
    }
    console.log(results);
    return results;
};
