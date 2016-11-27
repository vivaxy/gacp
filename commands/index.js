/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import isAGitRepository from '../lib/isAGitRepository';
import isGitStatusClean from '../lib/isGitStatusClean';
import * as console from '../lib/console';
import acp from '../lib/acp';
import prompt from '../lib/prompt';

export default async() => {
    if (!isAGitRepository()) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    if (isGitStatusClean()) {
        console.error(`nothing to commit, working tree clean`);
        process.exit(1);
    }
    const commitMessage = await prompt();
    acp(commitMessage);
};
