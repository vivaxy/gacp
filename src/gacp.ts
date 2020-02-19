/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */
import * as log from 'log-util';
import * as git from '@vivaxy/git';

import prompt from './prompt';
import GacpError from './errors/gacp';
import { EMOJI_TYPES } from './configs';
import * as logger from './shell/logger';
import checkNeedsPush from './git/status/check-needs-push';
import { clearHistory, flushHistory } from './messages/history';

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
  cwd,
}: {
  add: boolean;
  push: boolean;
  emoji: EMOJI_TYPES;
  cwd: string;
}) {
  let needsAdd = add;
  let needsCommit = true;
  let needsPush = push;
  let commitMessage = '';

  const isGitRepository = await git.isRepositoryRoot({ cwd });
  if (!isGitRepository) {
    throw new GacpError('Not a git repository.');
  }

  const gitClean = await git.isClean({ cwd });
  debug('gitClean', gitClean);
  needsAdd = needsAdd && !gitClean;

  const hasStagedFiles = (await git.getStagedFiles({ cwd })).length !== 0;
  debug('hasStagedFiles', hasStagedFiles);
  needsCommit = needsAdd || hasStagedFiles;

  // prompt first before performing any actions
  if (needsCommit) {
    commitMessage = await prompt({ emojiType: emoji });
    debug('commitMessage:', commitMessage);
  }

  if (needsAdd) {
    logger.command('git add .');
    await git.add({ cwd });
  } else {
    if (add) {
      log.info('Nothing to add, working tree clean.');
    } else {
      log.info('Skipping add.');
    }
  }

  if (needsCommit) {
    await git.commit(commitMessage, { cwd });
  } else {
    log.info('Nothing to commit, working tree clean.');
  }
  // If commit success, remove last commit message
  clearHistory();

  if (!needsAdd && !needsCommit) {
    await git.fetch({ cwd });
    needsPush = needsPush && (await checkNeedsPush({ cwd }));
  }

  if (needsPush) {
    await git.push({ cwd });
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
