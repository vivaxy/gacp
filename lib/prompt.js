/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

const prompts = require('prompts');
const wrap = require('word-wrap');

const { getHistory, setHistory } = require('./history.js');
const { getCommitTypes, updateTypesStat } = require('./commitTypes.js');
const { getGitmojis, updateGitmojisStat } = require('./gitmojis.js');

module.exports = async (emoji) => {
  const [typeList, gitmojiList] = await Promise.all([
    getCommitTypes(),
    getGitmojis(emoji),
  ]);
  const history = getHistory();

  function findInitial(list, key) {
    const index = list.findIndex(function({ value }) {
      return value === key;
    });
    if (index === -1) {
      return 0;
    }
  }

  // ${type}(${scope}): ${emoji}${subject} \n\n ${body} \n\n ${footer}
  const questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message: "Select the type of change that you're committing:",
      choices: typeList,
      initial: findInitial(typeList, history.type),
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Denote the scope of this change:\n',
      initial: history.scope,
    },
    {
      type: 'autocomplete',
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      choices: gitmojiList,
      initial: findInitial(gitmojiList, history.gitmoji),
    },
    {
      type: 'text',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:\n',
      initial: history.subject,
    },
    {
      type: 'text',
      name: 'body',
      message: 'Provide a longer description of the change:\n',
      initial: history.body,
    },
    {
      type: 'text',
      name: 'footer',
      message: 'List any breaking changes or issues closed by this change:\n',
      initial: history.footer,
    },
  ];

  const answers = await prompts(questions, {
    onCancel() {
      process.exit(0);
    },
  });
  setHistory(answers);

  const maxHeaderLength = 72;
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
  const gitmoji = answers.gitmoji ? `${answers.gitmoji} ` : '';

  // Hard limit this line
  let head = `${answers.type}${scope}: ${gitmoji}${answers.subject.trim()}`;
  head = head.slice(0, maxHeaderLength);

  // Wrap these lines at 100 characters
  const body = wrap(answers.body, wrapOptions);
  const footer = wrap(answers.footer, wrapOptions);

  await updateTypesStat(answers.type);

  await updateGitmojisStat({ key: emoji, value: answers.gitmoji });

  return `${head}\n\n${body}\n\n${footer}`;
};
