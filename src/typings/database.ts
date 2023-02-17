import { objectif, stats } from './utils';

export type DefaultQueryResult = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
};
export type QueryResult<T> = T extends DefaultQueryResult ? DefaultQueryResult : T[];
export enum DatabaseTables {
    Accounts = 'rpg_accounts'
}

export type accountType<Raw = true> = {
    user_id: string;
    book: number;
    chapter: number;
    cycle: number;
    stats: Raw extends true ? string : stats;
    objectifs: Raw extends true ? string : objectif[];
    username: string;
};
