import { Collection } from 'discord.js';
import { DatabaseTables, accountType } from '../typings/database';
import { query, sqlise } from '../utils/database';
import items from '../data/items';
import { inventory, item } from '../typings/game';
import { objectif } from '../utils/objectif';

export class AccountsManager {
    private cache: Collection<string, accountType<false>> = new Collection();

    constructor() {
        this.start();
    }

    public exists(user_id: string) {
        return this.cache.has(user_id);
    }
    public user(user_id: string) {
        return this.cache.get(user_id);
    }
    public async register(user_id: string, options: { username: string }) {
        if (this.exists(user_id)) return false;
        const data = {
            book: 1,
            chapter: 1,
            cycle: 1,
            user_id: user_id,
            inventory: this.defaultInventory,
            stats: {
                monsterKilled: 0,
                pv: 6,
                pvLoosed: 0,
                totalPv: 6,
                rubisFound: 0,
                heartQuarters: 0
            },
            username: options.username,
            objectifs: objectif('1', '1')
        };
        this.cache.set(user_id, data);

        await query(
            `INSERT INTO ${
                DatabaseTables.Accounts
            } ( user_id, username, book, chapter, cycle, inventory, stats, objectifs ) VALUES ( "${user_id}", "${sqlise(
                options.username
            )}", "1", "1", "1", '${JSON.stringify(this.defaultInventory)}', '${JSON.stringify(
                data.stats
            )}', '${JSON.stringify(data.objectifs)}' )`
        );

        return data;
    }
    public addHeartQuarter(user_id: string) {
        if (!this.exists(user_id)) return false;

        const data = this.user(user_id);
        data.stats.heartQuarters++;
        if (data.stats.heartQuarters === 4) {
            data.stats.heartQuarters = 0;
            data.stats.totalPv += 4;
            data.stats.pv = data.stats.totalPv;
        }

        this.cache.set(user_id, data);
        this.save(user_id);
    }
    private save(user_id: string, existed?: boolean) {
        const data = this.user(user_id);
        if (existed === false) {
            return query(
                `INSERT INTO ${
                    DatabaseTables.Accounts
                } ( user_id, username, book, chapter, cycle, inventory, stats, objectifs ) VALUES ("${user_id}", "${sqlise(
                    data.username
                )}", "${data.book}", "${data.chapter}", "${data.cycle}", '${JSON.stringify(
                    data.inventory
                )}', '${JSON.stringify(data.stats)}', '${JSON.stringify(data.objectifs)}')`
            );
        } else {
            return query(
                `UPDATE ${DatabaseTables.Accounts} SET cycle="${data.cycle}", username="${
                    data.username
                }", stats='${JSON.stringify(data.stats)}', book='${data.book}', chapter="${
                    data.chapter
                }", inventory='${JSON.stringify(data.inventory)}', objectifs='${JSON.stringify(
                    data.objectifs
                )}' WHERE user_id='${user_id}'`
            );
        }
    }
    public addLife(user_id: string, pv: number) {
        if (!this.exists(user_id)) return false;

        const data = this.user(user_id);
        data.stats.pv += pv;
        if (data.stats.pv > data.stats.totalPv) data.stats.pv = data.stats.totalPv;

        this.cache.set(user_id, data);
        this.save(user_id);

        return true;
    }
    public removeLife(user_id: string, pv: number) {
        if (!this.exists(user_id)) return false;

        const data = this.user(user_id);
        data.stats.pv -= pv;
        data.stats.pvLoosed += pv;

        if (data.stats.pv === 0) {
            this.endGame(user_id);
            return 'dead';
        }
        this.cache.set(user_id, data);
        this.save(user_id);
    }

    public endGame(user_id: string) {
        if (!this.exists(user_id)) return false;

        const data = this.user(user_id);
        data.stats.pv = 0;

        // TODO Finir la fonction de reset des objectifs
        // Ne pas oublier le query
    }
    public get defaultInventory() {
        const inventory = {};

        Object.keys(items).forEach((item: item) => {
            inventory[item] = items[item].defaultValue;
        });
        return inventory as inventory;
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
                stats: JSON.parse(v.stats),
                inventory: JSON.parse(v.inventory)
            });
        });
    }
}
