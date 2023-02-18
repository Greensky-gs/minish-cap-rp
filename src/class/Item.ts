/* eslint-disable @typescript-eslint/ban-types */
import { If } from 'discord.js';
import { item } from '../typings/game';
import { emojiType } from '../typings/utils';
import { emoji as Emoji } from '../utils/utils';

export type ItemType = 'weapon' | 'item' | 'protection';

type Extra<
    T extends ItemType,
    Weapon extends boolean = T extends 'weapon' ? true : false,
    Protection extends boolean = T extends 'protection' ? true : false
> = If<Weapon, { damages: { max: number; min: number; average: number } }, {}> &
    If<
        Protection,
        {
            protection: {
                max: number;
                min: number;
                average: number;
                sendBack: boolean;
                /**
                 * Frequence entre 0 et 1
                 */
                sendBackFrequence: number;
                /**
                 * Fréquence entre 0 et 1
                 */
                fullProtectionFrequence: number;
            };
        },
        {}
    >;
export class Item<Type extends ItemType = 'item'> {
    private _item: item;
    private _emojiName: emojiType | undefined;
    private _emoji: string | undefined;
    private _name: string;
    private _extra: Extra<Type>;
    private _type: Type;

    constructor(
        type: Type,
        { name, item, emoji, ...extra }: { item: item; name: string; emoji?: emojiType } & Extra<Type>
    ) {
        this._name = name;
        this._item = item;
        this._emojiName = emoji;
        this._type = type;

        if (emoji) {
            this._emoji = Emoji(emoji);
        }
        const over = extra as any;
        if (over?.damages) {
            (this._extra as any).damages = {
                average: over.damages.average,
                max: over.damages.max,
                min: over.damages.min
            };
        }
        if (over?.protection) {
            (this._extra as any).protection = {
                average: over.protection.average,
                max: over.protection.max,
                min: over.protection.min,
                sendBack: over.protection.sendBack,
                sendBackFrequence: over.protection.sendBackFrequence
            };
        }
    }

    public get item() {
        return this._item;
    }
    public get emoji() {
        return this._emoji;
    }
    public get name() {
        return this._name;
    }
    public get emojiName() {
        return this._emojiName;
    }
    public get type() {
        return this._type;
    }
    public get extra() {
        return this._extra;
    }
}
