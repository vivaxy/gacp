/**
 * @since 2017-02-04 16:59
 * @author vivaxy
 */

import * as configManager from './gitmoji-config-manager';
// from https://github.com/carloscuesta/gitmoji/blob/master/src/data/gitmojis.json
import defaultConfig from '../configs/gitmojis';
import {
  GitmojiConfig,
  GitmojiConfigItemWithStat,
  GitmojiConfigWithStat,
} from './gitmoji-config-manager';
import { EMOJI_TYPES } from '../configs';

function mapConfigWithStat(
  config: GitmojiConfig,
  statConfig: GitmojiConfigWithStat = { gitmojis: [] },
) {
  const gitmojisWithStat = statConfig.gitmojis;
  return {
    gitmojis: config.gitmojis.map((item) => {
      const findGitmojiWithStat = gitmojisWithStat.find((gitmoji) => {
        return gitmoji.code === item.code;
      });

      const stat = findGitmojiWithStat ? findGitmojiWithStat.stat : 0;

      return { ...item, stat };
    }),
  };
}

const hasNewGitmoji = () => {
  const { gitmojis } = configManager.read();
  return defaultConfig.gitmojis.length !== gitmojis.length;
};

const addNewGitmoji = async () => {
  const currentConfig = configManager.read();
  await configManager.write(mapConfigWithStat(defaultConfig, currentConfig));
};

const ensureGitmojiConfig = async () => {
  if (!(await configManager.exist())) {
    // map config with `stat: 0`
    await configManager.write(mapConfigWithStat(defaultConfig));
  }
  if (hasNewGitmoji()) {
    await addNewGitmoji();
  }
};

export async function getGitmojis({ emojiType }: { emojiType: EMOJI_TYPES }) {
  if (emojiType === EMOJI_TYPES.NONE) {
    return []
  }
  await ensureGitmojiConfig();

  const gitmojis = await configManager.readListByStatOrder();
  const gitmojiList = gitmojis.map((gitmoji) => {
    return {
      title: `${gitmoji.emoji}  - ${gitmoji.description}`,
      value: gitmoji[emojiType] || gitmoji.code,
    };
  });

  gitmojiList.unshift({ title: 'none', value: '' });
  return gitmojiList;
}

export async function updateGitmojisStat({
  key,
  value,
}: {
  key: EMOJI_TYPES.EMOJI | EMOJI_TYPES.CODE;
  value: string;
}) {
  const { gitmojis: originalGitmojis } = configManager.read();
  const gitmojis = originalGitmojis.map(
    (gitmoji: GitmojiConfigItemWithStat) => {
      if (gitmoji[key] === value) {
        return { ...gitmoji, stat: gitmoji.stat + 1 };
      }
      return gitmoji;
    },
  );
  await configManager.write({ gitmojis });
}
