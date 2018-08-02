/**
 * @since 2016-11-27 13:59
 * @author vivaxy
 */

const execa = require('execa');

const getBranch = require('./getBranch.js');
const getRemote = require('./getRemote.js');

const hasCommitInShell = async (file, args) => {
  let result = true;
  try {
    const { code, stdout } = await execa(file, args);
    if (code === 0) {
      const splitResult = stdout.split('\n\r');
      if (splitResult[0] === '') {
        result = false;
      }
    }
  } catch (ex) {
    // fatal: ambiguous argument 'remote/sonar..sonar': unknown revision or path not in the working tree.
    // Use '--' to separate paths from revisions, like this:
    // 'git <command> [<revision>...] -- [<file>...]'
    // remote branch not exits
    // result = true;
  }
  return result;
};

module.exports = async () => {
  let result = true;
  const remote = await getRemote();
  if (!remote) {
    result = false;
  } else {
    const branch = await getBranch();
    result = await hasCommitInShell('git', [
      'log',
      `${remote}/${branch}..${branch}`,
      '--pretty=format:%H',
    ]);
  }
  return result;
};
