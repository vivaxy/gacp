import gitmojis from '../gitmojis';

test('should export a defined shape', function() {
  gitmojis.gitmojis.forEach(function(gitmoji) {
    expect(typeof gitmoji.code).toBe('string');
    expect(typeof gitmoji.description).toBe('string');
    expect(typeof gitmoji.emoji).toBe('string');
  });
});
