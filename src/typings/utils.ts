import { If } from 'discord.js';
import emojis from '../data/emojis.json';
import { item } from './game';

export type objectifType = 'monsters' | 'rubis' | 'boss' | 'killspecificmonsters' | 'finditem';

type objectifData<T extends objectifType> = {
    item: If<T extends 'finditem' ? true : false, item, null>;
};
export type objectif<T extends objectifType> = {
    type: T;
    amount: number;
    amountDone: number;
} & objectifData<T>;

export type emojiType = keyof typeof emojis;
