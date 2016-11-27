/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import Listr from 'listr';

import isGitRepository from '../git/status/isGitRepository';
import gitClean from '../git/status/gitClean';
import needGitPush from '../git/status/needGitPush';
import gitRemote from '../git/status/gitRemote';
import * as console from '../lib/console';
import gitAdd from '../git/commands/gitAdd';
import gitCommit from '../git/commands/gitCommit';
import gitPush from '../git/commands/gitPush';
import prompt from '../lib/prompt';

const prepare = () => {

    const needGitAddOrCommit = !gitClean;

    if (!isGitRepository) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    if (!needGitAddOrCommit) {
        if (!needGitPush) {
            console.error(`nothing to commit or push, working tree clean`);
            process.exit(1);
        }
    }
};

export default async() => {

    prepare();

    const commitMessage = await prompt();

    const tasks = [
        {
            title: `git add`,
            task: gitAdd,
            skip: () => {
                if (gitClean) {
                    return `nothing to commit, working tree clean`;
                }
            },
        },
        {
            title: `git commit`,
            task: () => {
                return gitCommit(commitMessage);
            },
            skip: () => {
                if (gitClean) {
                    return `nothing to commit, working tree clean`;
                }
            },
        },
    ];

    const listr = new Listr(tasks);

    if (gitRemote) {
        listr.add({
            title: `git push`,
            task: gitPush,
            skip: () => {
                if (!gitRemote) {
                    return `no tracking remote`;
                }
            },
        });
    }

    try {
        await listr.run();
    } catch (ex) {
        console.error(ex);
    }

};
