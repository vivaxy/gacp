/**
 * @since 2019-06-17 19:19
 * @author vivaxy
 */
const test = require('ava');
const configs = require('../index.js');

test('should export configs', async function(t) {
  t.is(typeof configs, 'object');
});
