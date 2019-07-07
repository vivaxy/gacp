/**
 * @since 2019-06-13 15:01
 * @author vivaxy
 */
import test from 'ava';
import fileExists from '../file-exists';

test('should tell file not exists', async function(t) {
  const result = await fileExists('invalid file name');
  t.is(result, false);
});

test('should tell file exists', async function(t) {
  const result = await fileExists(__filename);
  t.is(result, true);
});
