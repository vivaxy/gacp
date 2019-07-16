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

async function prepare({ cwd }: { cwd: string }) {
  const isGitRepository = await checkIsGitRepository({ cwd });

  if (!isGitRepository) {
    throw new GacpError('Not a git repository.');
  }

  const gitClean = await getGitClean();
  const needGitAddOrCommit = !gitClean;

  if (!needGitAddOrCommit) {
    await gitFetch();
    const needPush = await checkNeedsPush();
    if (!needPush) {
      throw new GacpError('Nothing to commit or push, working tree clean.');
    }
  }
  return { needGitAddOrCommit };
}

async function runGitPush({ push }: { push: boolean }) {
  return push && (await gitPush());
}

async function runTasks({
  push,
  emoji,
  cwd,
}: {
  push: boolean;
  emoji: EMOJI_TYPES;
  cwd: string;
}) {
  const { needGitAddOrCommit } = await prepare({ cwd });

  if (!needGitAddOrCommit) {
    log.info('Nothing to add, working tree clean.');
    log.info('Nothing to commit, working tree clean.');
    return await runGitPush({ push });
  }

  const commitMessage = await prompt({ emojiType: emoji });
  debug('commitMessage:', commitMessage);

  await gitAdd();
  await gitCommit(commitMessage);
  // If commit success, remove last commit message
  clearHistory();
  return await runGitPush({ push });
}

export default async function gacp({
  cwd,
  push,
  emoji,
}: {
  cwd: string;
  push: boolean;
  emoji: EMOJI_TYPES;
}) {
  const startTime = getNow();
  await runTasks({ cwd, push, emoji });
  const endTime = getNow();
  log.success(`Done in ${(endTime - startTime) / 1000}s`);
  await flushHistory();
}
