/**
 * @since 2019-06-13 15:01
 * @author vivaxy
 */
const test = require('ava');
const path = require('path');
const fileExists = require('../fileExists.js');

test('should tell file not exists', async (t) => {
  const { result } = await fileExists('invalid file name');
  t.is(result, false);
});

test('should tell file exists', async (t) => {
  const { result } = await fileExists(path.join(__dirname, __filename));
  t.is(result, true);
});
