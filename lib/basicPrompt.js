/**
 * @since 2016-11-23 10:08
 * @author vivaxy
 */

import inquirer from 'inquirer';

export default async() => {
    const questions = [
        {
            type: `input`,
            name: `commitMessage`,
            message: `please enter commit message:\n`,
            validate: (msg) => {
                if (!msg.length) {
                    return `commit message is required`;
                }
                return true;
            },
        },
    ];
    const answers = await inquirer.prompt(questions);
    return answers.commitMessage;
}
