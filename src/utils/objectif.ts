import objectifs from '../data/objectifs.json';

export const objectif = <B extends keyof typeof objectifs, C extends keyof typeof objectifs[B]>(
    book: B,
    chapter: C
): typeof objectifs[B][C] => {
    return objectifs[book][chapter];
};
