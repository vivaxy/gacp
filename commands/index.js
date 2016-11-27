/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import Listr from 'listr';

import isGitRepository from '../git/status/isGitRepository';
import gitClean from '../git/status/gitClean';
import needGitPush from '../git/status/needGitPush';
import * as console from '../lib/console';
import gitAdd from '../git/commands/gitAdd';
import gitCommit from '../git/commands/gitCommit';
import gitPush from '../git/commands/gitPush';
import prompt from '../lib/prompt';

const needGitAddOrCommit = !gitClean;

const prepare = () => {
    if (!isGitRepository) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    if (!needGitAddOrCommit) {
        if (!needGitPush) {
            console.error(`nothing to commit, working tree clean`);
            process.exit(1);
        }
        gitPush();
        process.exit(0);
    }
};

export default async() => {

    prepare();

    const commitMessage = await prompt();

    const listr = new Listr([
        {
            title: `git add`,
            task: gitAdd,
        },
        {
            title: `git commit`,
            task: () => {
                return gitCommit(commitMessage);
            },
        },
        {
            title: `git push`,
            task: gitPush,
        }
    ]);

    try {
        await listr.run();
    } catch (ex) {
        console.error(ex);
    }

};
