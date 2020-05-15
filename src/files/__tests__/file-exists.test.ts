/**
 * @since 2019-06-13 15:01
 * @author vivaxy
 */
import fileExists from '../file-exists';

test('should tell file not exists', async function() {
  const result = await fileExists('invalid file name');
  expect(result).toBe(false);
});

test('should tell file exists', async function() {
  const result = await fileExists(__filename);
  expect(result).toBe(true);
});
