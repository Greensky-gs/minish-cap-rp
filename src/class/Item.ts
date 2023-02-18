/* eslint-disable @typescript-eslint/ban-types */
import { If } from 'discord.js';
import { item } from '../typings/game';
import { emojiType } from '../typings/utils';
import { emoji as Emoji } from '../utils/utils';

export type ItemType = 'weapon' | 'item' | 'protection';

type extraDamages<AllNull extends boolean = false> = {
    max: If<AllNull, null, number>;
    min: If<AllNull, null, number>;
    average: If<AllNull, null, number>;
};

type extraProtection<
    AllNull extends boolean = false,
    Number = If<AllNull, null, number>,
    Boolean = If<AllNull, null, boolean>
> = {
    max: Number;
    min: Number;
    average: Number;
    sendBack: Boolean;
    /**
     * Frequence entre 0 et 1
     */
    sendBackFrequence: Number;
    /**
     * Fréquence entre 0 et 1
     */
    fullProtectionFrequence: Number;
};

type Extra<
    T extends ItemType,
    Weapon extends boolean = T extends 'weapon' ? true : false,
    Protection extends boolean = T extends 'protection' ? true : false
> = If<Weapon, { damages: extraDamages<false> }, {}> &
    If<
        Protection,
        {
            protection: extraProtection<false>;
        },
        {}
    >;
export class Item<Type extends ItemType = 'item'> {
    private _item: item;
    private _emojiName: emojiType | undefined;
    private _emoji: string | undefined;
    private _name: string;
    private _type: Type;
    private _damages: extraDamages<Type extends 'weapon' ? true : false>;
    private _protection: Type extends 'protection' ? extraProtection<false> : extraProtection<true>;

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
            this._damages = {
                average: over.damages.average,
                max: over.damages.max,
                min: over.damages.min
            };
        }
        if (over?.protection) {
            this._protection = {
                average: over.protection.average,
                max: over.protection.max,
                min: over.protection.min,
                sendBack: over.protection.sendBack,
                sendBackFrequence: over.protection.sendBackFrequence,
                fullProtectionFrequence: over.protection.fullProtectionFrequence
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
    public get protection() {
        return this._protection;
    }
    public get damages() {
        return this._damages;
    }
    public get defaultValue() {
        if (['arrows', 'bomb_count', 'mysterious_shells', 'bombs'].includes(this._item)) return 0;
        if (['bomb_bag', 'rubisBag'].includes(this._item)) return 'petit';
        return this._item === 'smith_sword';
    }
}
