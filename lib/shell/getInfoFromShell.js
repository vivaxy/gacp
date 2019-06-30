/**
 * @since 2016-11-22 16:04
 * @author vivaxy
 */

const execa = require('execa');

module.exports = async function getInfoFromShell(file, args) {
  // here `...args` makes things worse, IDKY
  const { code, stdout } = await execa(file, args);
  if (code === 0) {
    return stdout.split('\n')[0];
  }
  return null;
};
