export const utils = {
    support: 'https://discord.gg/Qt9Ns3uvYe'
};

export const util = <T extends keyof typeof utils>(key: T): typeof utils[T] => {
    return utils[key];
};
