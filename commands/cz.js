/**
 * @since 2016-11-22 20:51
 * @author vivaxy
 */

import inquirer from 'inquirer';
import czConventionalChangelog from 'cz-conventional-changelog';

import isAGitRepository from '../lib/isAGitRepository';
import * as console from '../lib/console';
import acp from '../lib/acp';

export default async() => {
    if (!isAGitRepository()) {
        console.error(`not a git repository`);
        process.exit(1);
    }

    const commitMessage = await new Promise((resolve, reject) => {
        czConventionalChangelog.prompter(inquirer, (commitMessage) => {
            resolve(commitMessage);
        });
    });

    acp(commitMessage);
};
