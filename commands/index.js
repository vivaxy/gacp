/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import inquirer from 'inquirer';

import isAGitRepository from '../lib/isAGitRepository';
import * as console from '../lib/console';
import acp from '../lib/acp';

export default async(...restArgs) => {
    if (!isAGitRepository()) {
        console.error(`not a git repository`);
        process.exit(1);
    }
    let commitMessage = null;
    if (restArgs.length === 0) {
        const answers = await inquirer.prompt([{
            type: `input`,
            name: `commitMessage`,
            message: `please enter commit message:`,
            validate: (msg) => {
                if (!msg.length) {
                    return `commit message is required`;
                }
                return true;
            },
        }]);
        commitMessage = answers.commitMessage;
    } else {
        commitMessage = restArgs.join(` `);
    }
    acp(commitMessage);
};
