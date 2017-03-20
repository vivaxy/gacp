/**
 * @since 2017-02-04 16:59
 * @author vivaxy
 */

import * as configManager from './gitmojiConfigManager';
import defaultConfig from '../configs/gitmojis';

const mapConfigWithStat = (config, statConfig = {}) => {
    const gitmojisWithStat = statConfig.gitmojis || [];
    return {
        gitmojis: config.gitmojis.map((item) => {

            const findGitmojiWithStat = gitmojisWithStat.find((gitmoji) => {
                return gitmoji.code === item.code;
            });

            const stat = findGitmojiWithStat ? findGitmojiWithStat.stat : 0;

            return {
                ...item,
                stat,
            };
        }),
    }
};

const hasNewGitmoji = () => {
    const {gitmojis} = configManager.read();
    return defaultConfig.gitmojis.length !== gitmojis.length;
};

const ensureGitmojiConfig = async() => {
    if (!await configManager.exist()) {
        // map config with `stat: 0`
        await configManager.write(mapConfigWithStat(defaultConfig));
    }
    if (hasNewGitmoji()) {
        await addNewGitmoji();
    }
};

const addNewGitmoji = async() => {
    const currentConfig = configManager.read();
    await configManager.write(mapConfigWithStat(defaultConfig, currentConfig));
};

export const getGitmojis = async() => {

    await ensureGitmojiConfig();

    const gitmojis = await configManager.readListByStatOrder();
    const gitmojiList = gitmojis.map(gitmoji => {
        return {
            name: `${gitmoji.emoji}  - ${gitmoji.description}`,
            value: gitmoji.code,
        };
    });

    gitmojiList.unshift({
        name: `none`,
        value: ``,
    });

    return gitmojiList;
};

export const updateGitmojisStat = async({code}) => {
    const {gitmojis} = configManager.read();
    gitmojis.forEach((gitmoji) => {
        if (gitmoji.code === code) {
            gitmoji.stat++;
        }
    });
    await configManager.write({
        gitmojis,
    });
};
