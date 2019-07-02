/**
 * @since 2019-06-13 15:01
 * @author vivaxy
 */
const test = require('ava');
const fileExists = require('../fileExists.js');

test('should tell file not exists', async function(t) {
  const result = await fileExists('invalid file name');
  t.is(result, false);
});

test('should tell file exists', async function(t) {
  const result = await fileExists(__filename);
  t.is(result, true);
});
