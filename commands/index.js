/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

import inquirer from 'inquirer';
import chark from 'chalk';
import sh from 'shelljs';

const shellSilentConfig = {
    silent: true,
};

const getStdoutFromShell = (command) => {
    let result = null;
    const shellExec = sh.exec(command, shellSilentConfig);
    if (shellExec.code === 0) {
        result = shellExec.stdout.split(`\n`)[0];
    }
    return result;
};

const getRemote = () => {
    return getStdoutFromShell(`git remote`);
};

const getBranch = () => {
    return getStdoutFromShell(`git symbolic-ref --short HEAD`);
};

export default async(...restArgs) => {
    let commitMessage = null;
    if (restArgs.length === 0) {
        const answers = await inquirer.prompt([{
            type: `input`,
            name: `commitMessage`,
            message: `please enter commit message:`,
            validate: (msg) => {
                if (!msg.length) {
                    return `commit message is required`
                }
                return true;
            },
        }]);
        commitMessage = answers.commitMessage;
    } else {
        commitMessage = restArgs.join(` `);
    }
    const addCommand = `git add .`;
    console.log(chark.green(addCommand));
    sh.exec(addCommand);
    const commitCommand = `git commit -m "${commitMessage}"`;
    console.log(chark.green(commitCommand));
    sh.exec(commitCommand);
    const pushCommand = `git push ${getRemote()} ${getBranch()}`;
    console.log(chark.green(pushCommand));
    sh.exec(pushCommand);
};
