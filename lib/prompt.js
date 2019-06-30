/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

const debug = require('debug');
const wrap = require('word-wrap');
const { prompt } = require('enquirer');
const { getHistory, setHistory } = require('./messages/history.js');
const {
  getCommitTypes,
  updateTypesStat,
} = require('./messages/commitTypes.js');
const { getGitmojis, updateGitmojisStat } = require('./messages/gitmojis.js');

module.exports = async ({ emojiType }) => {
  const debugPrompt = debug('prompt');

  const [typeList, gitmojiList] = await Promise.all([
    getCommitTypes(),
    getGitmojis({ emojiType }),
  ]);
  const history = getHistory();

  function createSource(choices) {
    return async function source(answersSoFar, input) {
      if (!input) {
        return choices;
      }
      return choices.filter(function({ name, value }) {
        return (
          name.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
          value.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
      });
    };
  }

  debugPrompt('history:', history);

  // ${type}(${scope}): ${emoji}${subject} \n\n ${body} \n\n ${footer}
  const questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message: "Select the type of change that you're committing:",
      choices: typeList,
      initial: history.type,
      source: createSource(typeList),
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Denote the scope of this change:',
      initial: history.scope,
    },
    {
      type: 'autocomplete',
      name: 'gitmoji',
      message: 'Choose a gitmoji:',
      choices: gitmojiList,
      initial: history.gitmoji,
      source: createSource(gitmojiList),
    },
    {
      type: 'text',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change:',
      initial: history.subject,
    },
    {
      type: 'text',
      name: 'body',
      message: 'Provide a longer description of the change:',
      initial: history.body,
    },
    {
      type: 'text',
      name: 'footer',
      message: 'List any breaking changes or issues closed by this change:',
      initial: history.footer,
    },
  ];

  const answers = await prompt(questions);

  debugPrompt('got answers', answers);
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

  await updateGitmojisStat({ key: emojiType, value: answers.gitmoji });

  return `${head}\n\n${body}\n\n${footer}`;
};
