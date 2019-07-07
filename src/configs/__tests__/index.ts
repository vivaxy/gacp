/**
 * @since 2019-06-17 19:19
 * @author vivaxy
 */
import test from 'ava';
import { PATHS, GITMOJIS, ERROR_TYPES } from '../index';

test('should export paths configs', async function(t) {
  t.is(typeof PATHS, 'object');
});

test('should export error types object', async function(t) {
  t.is(typeof ERROR_TYPES, 'object');
});

test('should export gitmojis object', async function(t) {
  t.is(Array.isArray(GITMOJIS), true);
});
