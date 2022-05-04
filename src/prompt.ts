/**
 * @since 2016-11-23 10:23
 * @author vivaxy
 */
import * as chalk from 'chalk';
import * as log from 'log-util';
import * as wrap from 'word-wrap';
import * as prompts from 'prompts';
import { edit } from 'external-editor';
import { RuleConfigTuple } from '@commitlint/types';

import {
  getHistory,
  setHistory,
  Messages,
  DEFAULT_MESSAGES,
} from './messages/history';

import { getCommitTypes, updateTypesStat } from './messages/commit-types';

import { getGitmojis, updateGitmojisStat } from './messages/gitmojis';
import {
  getCommitlintConfigRules,
  getRuleValue,
} from './messages/commitlint-config';
import { EMOJI_TYPES } from './configs';

function debug(...message: any[]) {
  log.debug('gacp:prompt', ...message);
}

function trim(input: string) {
  return input.trim();
}

export default async function prompt({
  editor,
  emojiType,
}: {
  editor: boolean;
  emojiType: EMOJI_TYPES;
}) {
  const [typeList, gitmojiList] = await Promise.all([
    getCommitTypes(),
    getGitmojis({ emojiType }),
  ]);
  const history = getHistory();

  function findInitial(list: Array<{ value: string }>, key: string) {
    const index = list.findIndex(function ({ value }) {
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
    return choices.filter(function ({ title, value }) {
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
      format: trim,
    },
    {
      type: 'text',
      name: 'scope',
      message: 'Denote the scope of this change',
      initial: history.scope,
      format: trim,
    }
  ];
  if (gitmojiList.length) {
    questions.push({
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
        return trim(input);
      },
    })
  }
  questions.push({
      type: 'text',
      name: 'subject',
      message: 'Write a short, imperative tense description of the change',
      initial: history.subject,
      format: trim,
    },
    {
      type: 'text',
      name: 'body',
      message: 'Provide a longer description of the change',
      initial: history.body,
      format: trim,
    },
    {
      type: 'text',
      name: 'footer',
      message: 'List any breaking changes or issues closed by this change',
      initial: history.footer,
      format: trim,
    });

  const answers: Messages = { ...DEFAULT_MESSAGES };

  for (const q of questions) {
    let answer = {};
    if (editor && q.name === 'body') {
      const body = trim(edit(history.body));
      answer = {
        body,
      };
      log.success(chalk.bold(q.message), chalk.grey('…'), body);
    } else {
      answer = await prompts(q, {
        onCancel() {
          process.exit(0);
        },
      });
    }

    debug('got answer', answer);
    Object.assign(answers, answer);
  }
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
  const scope = answers.scope ? `(${answers.scope})` : '';
  const gitmoji = answers.gitmoji ? `${answers.gitmoji} ` : '';

  // Hard limit this line
  let head = `${answers.type}${scope}: ${gitmoji} ${answers.subject}`;
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

  function wrapWords(words: string, rule?: RuleConfigTuple<number>): string {
    const maxLineWidth = getRuleValue(rule, words.length);
    return wrap(words, getWrapOptions(maxLineWidth));
  }

  const body = wrapWords(answers.body, bodyMaxLengthRule);
  const footer = wrapWords(answers.footer, footerMaxLengthRule);

  await updateTypesStat(answers.type);

  if (emojiType === EMOJI_TYPES.CODE || emojiType === EMOJI_TYPES.EMOJI) {
    await updateGitmojisStat({ key: emojiType, value: answers.gitmoji });
  }

  let res = head;
  if (body) {
    res += `\n\n${body}`;
  }
  if (footer) {
    res += `\n\n${footer}`;
  }
  return res;
}
