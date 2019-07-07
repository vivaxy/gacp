import test from 'ava';
import gitmojis from '../gitmojis';

test('should export a defined shape', async function(t) {
  gitmojis.gitmojis.forEach(function(gitmoji) {
    t.truthy(gitmoji.code);
    t.truthy(gitmoji.description);
    t.truthy(gitmoji.emoji);
  });
});
