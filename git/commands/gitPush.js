/**
 * @since 2016-11-22 21:20
 * @author vivaxy
 */

const execa = require('@vivaxy/execa-process-log').default;

const getRemote = require('../status/getRemote.js');
const getBranch = require('../status/getBranch.js');
const checkRemoteDiffer = require('../status/checkRemoteDiffer.js');
const logger = require('../../lib/logger.js');
const GacpError = require('../../errors/GacpError.js');

module.exports = async () => {
  const branch = await getBranch();

  const remoteDiffer = await checkRemoteDiffer(branch);
  if (remoteDiffer) {
    throw new GacpError('Remote differ, please pull changes.');
  }

  const remote = await getRemote();
  if (!remote) {
    throw new GacpError('No tracking remote.');
  }
  logger.command(`git push ${remote} ${branch} --follow-tags`);
  return await execa('git', ['push', remote, branch, '--follow-tags']);
};
