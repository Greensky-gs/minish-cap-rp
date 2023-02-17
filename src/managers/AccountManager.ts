import { Collection } from 'discord.js';
import { DatabaseTables, accountType } from '../typings/database';
import { query } from '../utils/database';

export class ChapterManager {
    private cache: Collection<string, accountType<false>> = new Collection();

    constructor() {
        this.start();
    }

    private start() {
        this.fillCache();
    }
    private async fillCache() {
        const data = await query<accountType>(`SELECT * FROM ${DatabaseTables.Accounts}`);

        data.forEach((v) => {
            this.cache.set(v.user_id, {
                ...v,
                objectifs: JSON.parse(v.objectifs),
                stats: JSON.parse(v.stats)
            });
        });
    }
}
