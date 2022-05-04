/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */
import * as log from 'log-util';
import * as git from '@vivaxy/git';

import prompt from './prompt';
import runHook from './shell/run-hook';
import { EMOJI_TYPES } from './configs';
import * as logger from './shell/logger';
import checkNeedsPush from './git/check-needs-push';
import { clearHistory } from './messages/history';

type Hooks = {
  postpush: string;
};

function debug(...message: any[]) {
  log.debug('gacp:gacp', ...message);
}

function getNow() {
  return new Date().getTime();
}

async function runTasks({
  add,
  push,
  emoji,
  editor,
  verify,
  cwd,
  hooks,
}: {
  add: boolean;
  push: boolean;
  emoji: EMOJI_TYPES;
  editor: boolean;
  verify: boolean;
  cwd: string;
  hooks: Hooks;
}) {
  let needsAdd = add;
  let needsCommit = true;
  let needsPush = push;
  let commitMessage = '';

  const gitRoot = await git.getRootPath({ cwd });

  const gitClean = await git.isClean({ cwd: gitRoot });
  debug('gitClean', gitClean);
  needsAdd = needsAdd && !gitClean;

  const hasStagedFiles =
    (await git.getStagedFiles({ cwd: gitRoot })).length !== 0;
  debug('hasStagedFiles', hasStagedFiles);
  needsCommit = needsAdd || hasStagedFiles;

  // prompt first before performing any actions
  if (needsCommit) {
    commitMessage = await prompt({ emojiType: emoji, editor });
    debug('commitMessage:', commitMessage);
  }

  if (needsAdd) {
    logger.command('git add .');
    await git.add({ cwd: gitRoot });
  } else {
    if (add) {
      log.info('Nothing to add, working tree clean.');
    } else {
      log.info('Skipping add.');
    }
  }

  if (needsCommit) {
    await git.commit(commitMessage, { cwd: gitRoot, noVerify: !verify });
  } else {
    log.info('Nothing to commit, working tree clean.');
  }
  // If commit success, remove last commit message
  clearHistory();

  if (!needsAdd && !needsCommit) {
    await git.fetch({ cwd: gitRoot });
    needsPush = needsPush && (await checkNeedsPush({ cwd: gitRoot }));
  }

  if (needsPush) {
    await git.push({ cwd: gitRoot, setUpstream: true, noVerify: !verify });
    await runHook(hooks.postpush, { cwd: gitRoot });
  } else {
    if (push) {
      log.info('Nothing to push, everything up-to-date.');
    } else {
      log.info('Skipping push.');
    }
  }
}

export default async function gacp({
  cwd,
  add,
  push,
  emoji,
  editor,
  verify,
  hooks,
}: {
  cwd: string;
  add: boolean;
  push: boolean;
  emoji: EMOJI_TYPES;
  editor: boolean;
  verify: boolean;
  hooks: Hooks;
}) {
  const startTime = getNow();
  await runTasks({ cwd, add, push, emoji, editor, verify, hooks });
  const endTime = getNow();
  log.success(`Done in ${(endTime - startTime) / 1000}s`);
}
