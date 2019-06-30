/**
 * @since 2019-06-13 15:01
 * @author vivaxy
 */
const test = require('ava');
const errorTypes = require('../errorTypes.js');

test('should export error types', async function(t) {
  t.is(typeof errorTypes, 'object');
});
