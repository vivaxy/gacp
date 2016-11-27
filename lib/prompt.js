/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

import inquirer from 'inquirer';
import rightPad from 'right-pad';
import wrap from 'word-wrap';

import { gitmojis } from '../configs/gitmojis.json';
import { types as conventionalCommitTypes } from 'conventional-commit-types';

const formatTypeChoices = (map) => {

    let length = 0;

    const keys = Object.keys(map);

    keys.forEach((item) => {
        if (item.length > length) {
            length = item.length;
        }
    });

    return keys.map((key) => {
        return {
            name: `${rightPad(`${key}:`, length)} ${map[key].description}`,
            value: key,
        };
    });
};

const gitmojiList = gitmojis.map(gitmoji => {
    return {
        name: `${gitmoji.emoji}  - ${gitmoji.description}`,
        value: gitmoji.code,
    };
});

gitmojiList.unshift({
    name: `none`,
    value: ``,
});

const typeList = formatTypeChoices(conventionalCommitTypes);

export default async() => {
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
        }
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
    scope = scope ? `(${scope})` : ``;

    // Hard limit this line
    let head = `${answers.type}${scope}: ${answers.gitmoji}${answers.subject.trim()}`;
    head = head.slice(0, maxLineWidth);

    // Wrap these lines at 100 characters
    const body = wrap(answers.body, wrapOptions);
    const footer = wrap(answers.footer, wrapOptions);

    return `${head}\n\n${body}\n\n${footer}`;

};
