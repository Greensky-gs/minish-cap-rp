import { Item, ItemType } from '../class/Item';
import { item } from '../typings/game';

const items: Record<item, Item<ItemType>> = {
    arrows: new Item('item', { item: 'arrows', name: 'flèches' }),
    bomb_bag: new Item('item', { item: 'bomb_bag', name: 'bombes' }),
    bomb_count: new Item('item', { item: 'bomb_count', name: 'bombes' }),
    boomerang: new Item('weapon', {
        item: 'boomerang',
        name: 'boomerang',
        emoji: 'boomerang',
        damages: { max: 2, min: 1, average: 1 }
    }),
    bottles: new Item('item', { name: 'flacon', item: 'bottles', emoji: 'flacon' }),
    bow: new Item('weapon', { name: 'arc', item: 'bow', damages: { max: 3, min: 1, average: 2 } }),
    broken_picori_sword: new Item('item', {
        name: 'épée minish brisée',
        item: 'broken_picori_sword',
        emoji: 'brokenPicoriSword'
    }),
    gust_jar: new Item('item', { name: 'pot magique', item: 'gust_jar', emoji: 'gustJar' }),
    jabber_nut: new Item('item', { name: 'Noix blabla', item: 'jabber_nut', emoji: 'jabberNut' }),
    jumping_stick: new Item('item', { name: 'baton sauteur', item: 'jumping_stick', emoji: 'jumpingStick' }),
    lantern: new Item('item', { name: 'lanterne', item: 'lantern', emoji: 'lantern' }),
    light_bow: new Item('weapon', {
        name: 'arc de lumière',
        item: 'light_bow',
        damages: { max: 6, min: 2, average: 4 }
    }),
    mirror_shield: new Item('protection', {
        name: 'bouclier miroir',
        item: 'mirror_shield',
        emoji: 'mirrorShield',
        protection: { max: 4, min: 2, average: 2, sendBack: true, sendBackFrequence: 0.8, fullProtectionFrequence: 0.5 }
    }),
    mole_mitts: new Item('item', { name: 'griffes de taupes', item: 'mole_mitts' }),
    mysterious_shells: new Item('item', {
        name: 'coquillages surprises',
        item: 'mysterious_shells',
        emoji: 'coquillages'
    }),
    ocarina: new Item('item', { name: 'ocarina du vent', item: 'ocarina' }),
    power_bracelets: new Item('item', { name: 'bracelets de force', item: 'power_bracelets' }),
    remote_bomb: new Item('item', { name: 'bombes télécommandées', item: 'remote_bomb', emoji: 'remoteBomb' }),
    bombs: new Item('item', { name: 'bombes', item: 'bombs', emoji: 'bomb' }),
    remote_boomerang: new Item('weapon', {
        name: 'boomerang magique',
        item: 'remote_boomerang',
        emoji: 'remoteBoomerang',
        damages: { max: 4, min: 2, average: 2 }
    }),
    rocs_cape: new Item('item', { name: 'cape de roc', item: 'rocs_cape' }),
    rubisBag: new Item('item', { name: 'sac de rubis', item: 'rubisBag' }),
    shield: new Item('protection', {
        name: 'bouclier',
        item: 'shield',
        emoji: 'bouclier',
        protection: { max: 4, min: 2, average: 4, sendBack: false, sendBackFrequence: 0, fullProtectionFrequence: 0.75 }
    }),
    smith_sword: new Item('weapon', {
        name: 'épée de smith',
        item: 'smith_sword',
        damages: { max: 1, min: 1, average: 1 }
    }),
    sword_of_four: new Item('weapon', {
        name: 'épée de quatre',
        item: 'sword_of_four',
        damages: { max: 3, min: 3, average: 3 }
    }),
    white_sword: new Item('weapon', {
        name: 'épée blanche',
        item: 'white_sword',
        damages: { max: 2, min: 2, average: 2 }
    })
};

export default items;
