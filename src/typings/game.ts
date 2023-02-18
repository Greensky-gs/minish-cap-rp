import ennemies from '../data/ennemies.json';
import { emojiType, objectif, objectifType } from './utils';

export type size = 'petit' | 'moyen' | 'grand';
export type stats = {
    monsterKilled: number;
    pvLoosed: number;
    pv: number;
    totalPv: number;
    rubisFound: number;
};
export type inventory = {
    smith_sword: boolean;
    broken_picori_sword: boolean;
    white_sword: boolean;
    sword_of_four: boolean;
    shield: boolean;
    gust_jar: boolean;
    bomb_bag: size;
    rubisBag: size;
    remote_bomb: boolean;
    boomerang: boolean;
    remote_boomerang: boolean;
    bomb_count: number;
    jumping_stick: boolean;
    bow: boolean;
    arrows: number;
    light_bow: boolean;
    /**
     * Griffes de taupe
     */
    mole_mitts: boolean;
    ocarina: boolean;
    lantern: boolean;
    rocs_cape: boolean;
    bottles: number;
    mirror_shield: boolean;
    mysterious_shells: number;
    power_bracelets: boolean;
    jabber_nut: boolean;
    bombs: boolean;
};
export type item = keyof inventory;
export type ennemyRarity = 'common' | 'uncommon' | 'rare' | 'spawnonly' | 'boss';
export type ennemy = {
    name: string;
    id: keyof typeof ennemies;
    damages: {
        max: number;
        min: number;
        average: number;
    };
    protection: {
        min: number;
        max: number;
        average: number;
        /**
         * Tout les `insensibleCycle` tours, l'ennemi sera insensible aux dégâts
         * Si la valeur est configurée sur 0, l'ennemi ne sera jamais insensible
         */
        insensibleCycle: number;
        emoji?: emojiType;
        rarity: ennemyRarity;
    };
};
export type chapter = {
    name: string;
    resume: string;
    number: number;
    emoji?: emojiType;
    objectifs: objectif<objectifType>[];
    boss: keyof typeof ennemies;
};
