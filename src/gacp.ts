/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */
import * as log from 'log-util';

import checkIsGitRepository from './git/status/check-is-repository';
import getGitClean from './git/status/get-clean';
import checkNeedsPush from './git/status/check-needs-push';
import gitAdd from './git/commands/git-add';
import gitCommit from './git/commands/git-commit';
import gitPush from './git/commands/git-push';
import gitFetch from './git/commands/git-fetch';
import prompt from './prompt';
import GacpError from './errors/gacp';
import { clearHistory, flushHistory } from './messages/history';
import { EMOJI_TYPES } from './configs';

function debug(...message: any[]) {
  log.debug('gacp:gacp', ...message);
}

function getNow() {
  return new Date().getTime();
}

async function checkGitRepository({ cwd }: { cwd: string }) {
  const isGitRepository = await checkIsGitRepository({ cwd });

  if (!isGitRepository) {
    throw new GacpError('Not a git repository.');
  }
}

async function runTasks({
  add,
  push,
  emoji,
  cwd,
}: {
  add: boolean;
  push: boolean;
  emoji: EMOJI_TYPES;
  cwd: string;
}) {
  let needAdd = add;
  let needCommit = true;
  let needPush = push;
  let commitMessage = '';

  await checkGitRepository({ cwd });

  if (needAdd) {
    const gitClean = await getGitClean();
    needAdd = !gitClean;
    needCommit = !gitClean;
  }

  // prompt first before performing any actions
  if (needCommit) {
    commitMessage = await prompt({ emojiType: emoji });
    debug('commitMessage:', commitMessage);
  }

  if (needAdd) {
    await gitAdd();
  } else {
    if (add) {
      log.info('Nothing to add, working tree clean.');
    } else {
      log.info('Skipping add.');
    }
  }

  if (needCommit) {
    await gitCommit(commitMessage);
  } else {
    log.info('Nothing to commit, working tree clean.');
  }
  // If commit success, remove last commit message
  clearHistory();

  if (!needAdd && !needCommit) {
    await gitFetch();
    needPush = await checkNeedsPush();
  }

  if (needPush) {
    await gitPush();
  } else {
    if (push) {
      log.info('Nothing to push, synced to remote.');
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
}: {
  cwd: string;
  add: boolean;
  push: boolean;
  emoji: EMOJI_TYPES;
}) {
  const startTime = getNow();
  await runTasks({ cwd, add, push, emoji });
  const endTime = getNow();
  log.success(`Done in ${(endTime - startTime) / 1000}s`);
  await flushHistory();
}
