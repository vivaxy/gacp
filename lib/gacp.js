/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

const debug = require('debug');

const checkGitRepository = require('./git/status/checkGitRepository.js');
const getClean = require('./git/status/getClean.js');
const checkNeedPush = require('./git/status/checkNeedPush.js');
const logger = require('./shell/logger.js');
const gitAdd = require('./git/commands/gitAdd.js');
const gitCommit = require('./git/commands/gitCommit.js');
const gitPush = require('./git/commands/gitPush.js');
const gitFetch = require('./git/commands/gitFetch.js');
const prompt = require('./prompt.js');
const GacpError = require('./errors/GacpError.js');
const errorTypes = require('./configs/errorTypes.js');
const { clearHistory, flushHistory } = require('./messages/history.js');

const debugCommand = debug('command');

const getNow = () => {
  return new Date().getTime();
};

const prepare = async () => {
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
};

const runGitPush = async (push) => {
  return push && (await gitPush());
};

const runTasks = async ({ push, emoji }) => {
  const { needGitAddOrCommit } = await prepare();

  if (!needGitAddOrCommit) {
    logger.info('Nothing to add, working tree clean.');
    logger.info('Nothing to commit, working tree clean.');
    return await runGitPush(push);
  }

  const commitMessage = await prompt({ emojiType: emoji });
  debugCommand('commitMessage:', commitMessage);

  await gitAdd();
  await gitCommit(commitMessage);
  // If commit success, remove last commit message
  clearHistory();
  return await runGitPush(push);
};

module.exports = async (options) => {
  try {
    const startTime = getNow();
    await runTasks(options);
    const endTime = getNow();
    logger.success(`Done in ${(endTime - startTime) / 1000}s`);
    await flushHistory();
    process.exit(0);
  } catch (ex) {
    if (ex.type === errorTypes.GACP) {
      logger.gacpError(ex.message);
    } else {
      logger.uncaughtError(ex);
    }
    await flushHistory();
    process.exit(1);
  }
};
