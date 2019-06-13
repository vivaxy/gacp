/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

const inquirer = require('inquirer');
const wrap = require('word-wrap');

const { getHistory, setHistory } = require('./history.js');
const { getCommitTypes, updateTypesStat } = require('./commitTypes.js');
const { getGitmojis, updateGitmojisStat } = require('./gitmojis.js');

module.exports = async () => {
  const [typeList, gitmojiList, history] = await Promise.all([
    getCommitTypes(),
    getGitmojis(),
    getHistory(),
  ]);

  // ${type}(${scope}): ${emoji}${subject} \n\n ${body} \n\n ${footer}
  const questions = [
    {
      type: 'list',
      name: 'type',
      message: "Select the type of change that you're committing:",
      choices: typeList,
      default: history.type,
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Denote the scope of this change:\n',
      default: history.scope,
    },
    {
      type: 'list',
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      choices: gitmojiList,
      default: history.gitmoji,
    },
    {
      type: 'input',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
      default: history.subject,
    },
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change:\n',
      default: history.body,
    },
    {
      type: 'input',
      name: 'footer',
      message: 'List any breaking changes or issues closed by this change:\n',
      default: history.footer,
    },
  ];

  const answers = await inquirer.prompt(questions);
  await setHistory(answers);

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
  let head = `${answers.type}${scope}: ${
    answers.gitmoji
  }${answers.subject.trim()}`;
  head = head.slice(0, maxLineWidth);

  // Wrap these lines at 100 characters
  const body = wrap(answers.body, wrapOptions);
  const footer = wrap(answers.footer, wrapOptions);

  await updateTypesStat(answers.type);

  await updateGitmojisStat({ code: answers.gitmoji });

  return `${head}\n\n${body}\n\n${footer}`;
};
