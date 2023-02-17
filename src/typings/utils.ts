export type objectifType = 'monsters' | 'rubis' | 'boss' | 'killspecificmonsters';
export type objectif = {
    type: objectifType;
    amount: number;
    amountDone: number;
};
export type stats = {
    monsterKilled: number;
    pvLoosed: number;
    pv: number;
    totalPv: number;
};
