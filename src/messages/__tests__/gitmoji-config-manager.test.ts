/**
 * @since 2017-02-05 12:49
 * @author vivaxy
 */
import * as gitmojiConfigManager from '../gitmoji-config-manager';

test('config should has correct exports', function() {
  expect(typeof gitmojiConfigManager.read).toBe('function');
  expect(typeof gitmojiConfigManager.write).toBe('function');
  expect(typeof gitmojiConfigManager.exist).toBe('function');
  expect(typeof gitmojiConfigManager.readListByStatOrder).toBe('function');
});
