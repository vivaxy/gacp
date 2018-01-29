/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import checkGitRepository from '../git/status/checkGitRepository';
import getClean from '../git/status/getClean';
import checkNeedPush from '../git/status/checkNeedPush';
import * as logger from '../lib/logger';
import gitAdd from '../git/commands/gitAdd';
import gitCommit from '../git/commands/gitCommit';
import gitPush from '../git/commands/gitPush';
import gitFetch from '../git/commands/gitFetch';
import prompt from '../lib/prompt';

const prepare = async () => {
    const isGitRepository = await checkGitRepository();

    if (!isGitRepository) {
        logger.error('Not a git repository.');
        process.exit(1);
    }

    const gitClean = await getClean();
    const needGitAddOrCommit = !gitClean;

    if (!needGitAddOrCommit) {
        await gitFetch();
        const needPush = await checkNeedPush();
        if (!needPush) {
            logger.error('Nothing to commit or push, working tree clean.');
            process.exit(1);
        }
    }
    return { needGitAddOrCommit };
};

const runTasks = async () => {
    const { needGitAddOrCommit } = await prepare();

    if (!needGitAddOrCommit) {
        logger.info('Nothing to add, working tree clean.');
        logger.info('Nothing to commit, working tree clean.');
        return await gitPush();
    }

    const commitMessage = await prompt();
    await gitAdd();
    await gitCommit(commitMessage);
    return await gitPush();
};

export default async () => {
    try {
        await runTasks();
        process.exit(0);
    } catch (ex) {
        logger.info(ex.stack);
        logger.error(ex.message);
        process.exit(1);
    }
};
