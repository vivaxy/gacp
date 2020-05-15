/**
 * @since 2019-06-17 19:19
 * @author vivaxy
 */
import { PATHS, GITMOJIS, ERROR_TYPES } from '..';

test('should export paths configs', function() {
  expect(typeof PATHS).toBe('object');
});

test('should export error types object', function() {
  expect(typeof ERROR_TYPES).toBe('object');
});

test('should export gitmojis object', function() {
  expect(Array.isArray(GITMOJIS)).toBe(true);
});
