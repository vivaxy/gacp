/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

import sh from 'shelljs';

import * as console from '../../lib/console';
import gitRemote from '../status/gitRemote';
import gitBranch from '../status/gitBranch';
import getGitRemoteDiffer from '../status/getGitRemoteDiffer';

export default () => {
    if (getGitRemoteDiffer()) {
        throw new Error(`remote differ, please pull changes`);
    }

    const pushCommand = `git push ${gitRemote} ${gitBranch} --tag`;
    console.info(pushCommand);
    sh.exec(pushCommand);
};
