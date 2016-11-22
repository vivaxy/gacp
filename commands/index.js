/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import inquirer from 'inquirer';
import sh from 'shelljs';

import getInfoFromShell from '../lib/getInfoFromShell';
import isAGitRepository from '../lib/isAGitRepository';
import * as console from '../lib/console';

const getRemote = () => {
    return getInfoFromShell(`git remote`);
};

const getBranch = () => {
    return getInfoFromShell(`git symbolic-ref --short HEAD`);
};

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
    const addCommand = `git add .`;
    console.info(addCommand);
    sh.exec(addCommand);
    const commitCommand = `git commit -m "${commitMessage}"`;
    console.info(commitCommand);
    sh.exec(commitCommand);
    const pushCommand = `git push ${getRemote()} ${getBranch()}`;
    console.info(pushCommand);
    sh.exec(pushCommand);
    return true;
};
