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
