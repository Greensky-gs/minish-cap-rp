import ennemies from '../data/ennemies.json';
import { ennemy } from '../typings/game';

export const enemy = <T extends keyof typeof ennemies>(enemy: T): ennemy => {
    return ennemies[enemy] as ennemy;
};
