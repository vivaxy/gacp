/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */

import * as log from 'log-util';
import * as wrap from 'word-wrap';
import * as prompts from 'prompts';

import { getHistory, setHistory, History } from './messages/history';

import { getCommitTypes, updateTypesStat } from './messages/commit-types';

import { getGitmojis, updateGitmojisStat } from './messages/gitmojis';
import {
  CommitlintRule,
  getCommitlintConfigRules,
  getRuleValue,
} from './messages/commitlint-config';
import { EMOJI_TYPES } from './configs';

function debug(...message: any[]) {
  log.debug('gacp:prompt', ...message);
}

export default async function prompt({
  emojiType,
}: {
  emojiType: EMOJI_TYPES;
}) {
  const [typeList, gitmojiList] = await Promise.all([
    getCommitTypes(),
    getGitmojis({ emojiType }),
  ]);
  const history = getHistory();

  function findInitial(list: Array<{ value: string }>, key: string) {
    const index = list.findIndex(function({ value }) {
      return value === key;
    });
    if (index === -1) {
      return 0;
    }
    return index;
  }

  function suggest(
    input: string,
    choices: Array<{ title: string; value: string }>,
  ) {
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
  const questions: prompts.PromptObject[] = [
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
      format(input: string) {
        if (input === 'none') {
          return '';
        }
        return input;
      },
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

  const answers = (await prompts(questions, {
    onCancel() {
      process.exit(0);
    },
  })) as History;

  debug('got answers', answers);
  setHistory(answers);

  const {
    'header-max-length': headerMaxLengthRule,
    'body-max-line-length': bodyMaxLengthRule,
    'footer-max-line-length': footerMaxLengthRule,
  } = await getCommitlintConfigRules();

  const maxHeaderLength = getRuleValue(headerMaxLengthRule, Infinity);
  debug('maxHeaderLength', maxHeaderLength);

  // parentheses are only needed when a scope is present
  let scope = answers.scope.trim();
  scope = scope ? `(${scope})` : '';
  const gitmoji = answers.gitmoji ? `${answers.gitmoji} ` : '';

  // Hard limit this line
  let head = `${answers.type}${scope}: ${gitmoji}${answers.subject.trim()}`;
  head = head.slice(0, maxHeaderLength);

  // Wrap these lines
  function getWrapOptions(width: number) {
    return {
      trim: true,
      newline: '\n',
      indent: '',
      width,
    };
  }

  function wrapWords(words: string, rule: CommitlintRule): string {
    const maxLineWidth = getRuleValue(rule, words.length);
    return wrap(words, getWrapOptions(maxLineWidth));
  }

  const body = wrapWords(answers.body, bodyMaxLengthRule);
  const footer = wrapWords(answers.footer, footerMaxLengthRule);

  await updateTypesStat(answers.type);

  await updateGitmojisStat({ key: emojiType, value: answers.gitmoji });

  return `${head}\n\n${body}\n\n${footer}`;
}
