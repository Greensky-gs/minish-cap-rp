import emojis from '../data/emojis.json';
export const utils = {
    support: 'https://discord.gg/Qt9Ns3uvYe'
};

export const util = <T extends keyof typeof utils>(key: T): typeof utils[T] => {
    return utils[key];
};
export const emoji = (emoji: keyof typeof emojis): string => {
    return emojis[emoji];
};
