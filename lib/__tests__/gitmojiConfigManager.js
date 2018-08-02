/**
 * @since 2017-02-05 12:49
 * @author vivaxy
 */

const test = require('ava');
const gitmojiConfigManager = require('../gitmojiConfigManager.js');

test('config should has correct exports', (t) => {
  t.true(typeof gitmojiConfigManager.read === 'function');
  t.true(typeof gitmojiConfigManager.write === 'function');
  t.true(typeof gitmojiConfigManager.exist === 'function');
  t.true(typeof gitmojiConfigManager.readListByStatOrder === 'function');
});
