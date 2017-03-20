/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

import inquirer from 'inquirer';
import wrap from 'word-wrap';

import { getCommitTypes, updateTypesStat } from './commitTypes';
import { getGitmojis, updateGitmojisStat } from './gitmojis';

export default async() => {
    const typeList = await getCommitTypes();
    const gitmojiList = await getGitmojis();

    // ${type}(${scope}): ${emoji}${subject} \n\n ${body} \n\n ${footer}
    const questions = [
        {
            type: 'list',
            name: 'type',
            message: 'Select the type of change that you\'re committing:',
            choices: typeList,
        },
        {
            type: 'input',
            name: 'scope',
            message: 'Denote the scope of this change:\n',
        },
        {
            type: 'list',
            name: 'gitmoji',
            message: 'Choose a gitmoji:',
            choices: gitmojiList,
        },
        {
            type: 'input',
            name: 'subject',
            message: 'Write a short, imperative tense description of the change:\n',
        },
        {
            type: 'input',
            name: 'body',
            message: 'Provide a longer description of the change:\n',
        },
        {
            type: 'input',
            name: 'footer',
            message: 'List any breaking changes or issues closed by this change:\n',
        },
    ];

    const answers = await inquirer.prompt(questions);

    const maxLineWidth = 100;

    const wrapOptions = {
        trim: true,
        newline: '\n',
        indent: '',
        width: maxLineWidth,
    };

    // parentheses are only needed when a scope is present
    let scope = answers.scope.trim();
    scope = scope ? `(${scope})` : '';

    // Hard limit this line
    let head = `${answers.type}${scope}: ${answers.gitmoji}${answers.subject.trim()}`;
    head = head.slice(0, maxLineWidth);

    // Wrap these lines at 100 characters
    const body = wrap(answers.body, wrapOptions);
    const footer = wrap(answers.footer, wrapOptions);

    await updateTypesStat(answers.type);

    await updateGitmojisStat({
        code: answers.gitmoji,
    });

    return `${head}\n\n${body}\n\n${footer}`;
};
