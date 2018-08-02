/**
 * @since 2016-11-22 14:55
 * @author vivaxy
 */

const checkGitRepository = require('../git/status/checkGitRepository.js');
const getClean = require('../git/status/getClean.js');
const checkNeedPush = require('../git/status/checkNeedPush.js');
const logger = require('../lib/logger.js');
const gitAdd = require('../git/commands/gitAdd.js');
const gitCommit = require('../git/commands/gitCommit.js');
const gitPush = require('../git/commands/gitPush.js');
const gitFetch = require('../git/commands/gitFetch.js');
const prompt = require('../lib/prompt.js');
const GacpError = require('../errors/GacpError.js');
const errorTypes = require('../configs/errorTypes.js');

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

const runTasks = async () => {
  const { needGitAddOrCommit } = await prepare();

  if (!needGitAddOrCommit) {
    logger.info('Nothing to add, working tree clean.');
    logger.info('Nothing to commit, working tree clean.');
    return await gitPush();
  }

  const commitMessage = await prompt();
  await gitAdd();
  await gitCommit(commitMessage);
  return await gitPush();
};

module.exports = async () => {
  try {
    const startTime = getNow();
    await runTasks();
    const endTime = getNow();
    logger.success(`Done in ${(endTime - startTime) / 1000}s`);
    process.exit(0);
  } catch (ex) {
    if (ex.type === errorTypes.GACP) {
      logger.gacpError(ex.message);
    } else {
      logger.uncaughtError(ex);
    }
    process.exit(1);
  }
};
