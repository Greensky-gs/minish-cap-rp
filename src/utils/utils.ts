import emojis from '../data/emojis.json';
import { emojiType } from '../typings/utils';
export const utils = {
    support: 'https://discord.gg/Qt9Ns3uvYe'
};

export const util = <T extends keyof typeof utils>(key: T): typeof utils[T] => {
    return utils[key];
};
export const emoji = (emoji: emojiType): string => {
    return emojis[emoji];
};
