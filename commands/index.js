/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import Listr from 'listr';

import checkGitRepository from '../git/status/checkGitRepository';
import getClean from '../git/status/getClean';
import checkNeedPush from '../git/status/checkNeedPush';
import getRemote from '../git/status/getRemote';
import * as console from '../lib/console';
import gitAdd from '../git/commands/gitAdd';
import gitCommit from '../git/commands/gitCommit';
import gitPush from '../git/commands/gitPush';
import gitFetch from '../git/commands/gitFetch';
import prompt from '../lib/prompt';
import hijackProcessInput from '../lib/hijackProcessInput';

const prepare = async() => {

    const gitClean = await getClean();

    const needGitAddOrCommit = !gitClean;
    const isGitRepository = await checkGitRepository();

    if (!isGitRepository) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    if (!needGitAddOrCommit) {
        await gitFetch();
        const needPush = await checkNeedPush();
        if (!needPush) {
            console.error(`nothing to commit or push, working tree clean`);
            process.exit(1);
        }
    }
    return {
        gitClean,
    };
};

export default async() => {

    const {
        gitClean,
    } = await prepare();

    let commitMessage;

    if (!gitClean) {
        commitMessage = await prompt();
    }

    const tasks = [
        {
            title: `git add`,
            task: gitAdd,
            skip: () => {
                if (gitClean) {
                    return `nothing to add, working tree clean`;
                }
            },
        },
        {
            title: `git commit`,
            task: async() => {
                return await gitCommit(commitMessage);
            },
            skip: () => {
                if (gitClean) {
                    return `nothing to commit, working tree clean`;
                }
            },
        },
        {
            title: `git push`,
            task: gitPush,
            skip: async() => {
                const remote = await getRemote();
                if (!remote) {
                    return `no tracking remote`;
                }
            },
        },
    ];

    const listr = new Listr(tasks);

    try {
        // https://github.com/SamVerschueren/listr/issues/38
        hijackProcessInput.pause();
        await listr.run();
    } catch (ex) {
        console.error(ex);
    } finally {
        hijackProcessInput.resume();
    }

};
