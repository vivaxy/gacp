/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

const log = require('log-util');
const wrap = require('word-wrap');
const prompts = require('prompts');

const { getHistory, setHistory } = require('./messages/history.js');
const {
  getCommitTypes,
  updateTypesStat,
} = require('./messages/commitTypes.js');
const { getGitmojis, updateGitmojisStat } = require('./messages/gitmojis.js');
const {
  getCommitlintConfigRules,
  getRuleValue,
} = require('./messages/commitlintConfig');

function debug(...message) {
  log.debug('gacp:prompt', ...message);
}

module.exports = async function prompt({ emojiType }) {
  const [typeList, gitmojiList] = await Promise.all([
    getCommitTypes(),
    getGitmojis({ emojiType }),
  ]);
  const history = getHistory();

  function findInitial(list, key) {
    const index = list.findIndex(function({ value }) {
      return value === key;
    });
    if (index === -1) {
      return 0;
    }
    return index;
  }

  function suggest(input, choices) {
    if (!input) {
      return choices;
    }
    return choices.filter(function({ title, value }) {
      return (
        title.toLowerCase().indexOf(input.toLowerCase()) > -1 ||
        value.toLowerCase().indexOf(input.toLowerCase()) > -1
      );
    });
  }

  debug('history:', history);

  // ${type}(${scope}): ${emoji}${subject} \n\n ${body} \n\n ${footer}
  const questions = [
    {
      type: 'autocomplete',
      name: 'type',
      message: "Select the type of change that you're committing",
      choices: typeList,
      initial: findInitial(typeList, history.type),
      suggest,
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Denote the scope of this change',
      initial: history.scope,
    },
    {
      type: 'autocomplete',
      name: 'gitmoji',
      message: 'Choose a gitmoji',
      choices: gitmojiList,
      initial: findInitial(gitmojiList, history.gitmoji),
      suggest,
      format(input) {
        if (input === 'none') {
          return '';
        }
        return input;
      },
      fallback: undefined,
    },
    {
      type: 'text',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change',
      initial: history.subject,
    },
    {
      type: 'text',
      name: 'body',
      message: 'Provide a longer description of the change',
      initial: history.body,
    },
    {
      type: 'text',
      name: 'footer',
      message: 'List any breaking changes or issues closed by this change',
      initial: history.footer,
    },
  ];

  const answers = await prompts(questions, {
    onCancel() {
      process.exit(0);
    },
  });

  debug('got answers', answers);
  setHistory(answers);

  const {
    'header-max-length': headerMaxLengthRule = [],
    'body-max-line-length': bodyMaxLengthRule = [],
  } = await getCommitlintConfigRules();

  const maxHeaderLength = getRuleValue(headerMaxLengthRule, Infinity);
  debug('maxHeaderLength', maxHeaderLength);

  const maxLineWidth = getRuleValue(bodyMaxLengthRule, Infinity);
  debug('maxLineWidth', maxLineWidth);

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
