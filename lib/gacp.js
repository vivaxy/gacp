/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

const log = require('log-util');

const checkGitRepository = require('./git/status/checkGitRepository.js');
const getClean = require('./git/status/getClean.js');
const checkNeedPush = require('./git/status/checkNeedPush.js');
const gitAdd = require('./git/commands/gitAdd.js');
const gitCommit = require('./git/commands/gitCommit.js');
const gitPush = require('./git/commands/gitPush.js');
const gitFetch = require('./git/commands/gitFetch.js');
const prompt = require('./prompt.js');
const GacpError = require('./errors/GacpError.js');
const { clearHistory, flushHistory } = require('./messages/history.js');

function debug(...message) {
  log.debug('gacp:gacp', ...message);
}

function getNow() {
  return new Date().getTime();
}

async function prepare() {
  const isGitRepository = await checkGitRepository();

  if (!isGitRepository) {
    throw new GacpError('Not a git repository.');
  }

  const gitClean = await getClean();
  const needGitAddOrCommit = !gitClean;

  if (!needGitAddOrCommit) {
    await gitFetch();
    const needPush = await checkNeedPush();
    if (!needPush) {
      throw new GacpError('Nothing to commit or push, working tree clean.');
    }
  }
  return { needGitAddOrCommit };
}

async function runGitPush(push) {
  return push && (await gitPush());
}

async function runTasks({ push, emoji }) {
  const { needGitAddOrCommit } = await prepare();

  if (!needGitAddOrCommit) {
    log.info('Nothing to add, working tree clean.');
    log.info('Nothing to commit, working tree clean.');
    return await runGitPush(push);
  }

  const commitMessage = await prompt({ emojiType: emoji });
  debug('commitMessage:', commitMessage);

  await gitAdd();
  await gitCommit(commitMessage);
  // If commit success, remove last commit message
  clearHistory();
  return await runGitPush(push);
}

module.exports = async function gacp(options) {
  const startTime = getNow();
  await runTasks(options);
  const endTime = getNow();
  log.success(`Done in ${(endTime - startTime) / 1000}s`);
  await flushHistory();
};
