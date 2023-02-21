import { CoinsManager, account } from 'coins-manager';
import { checkDatabase, database } from '../utils/database';
import { AmethystClient } from 'amethystjs';
import { AccountsManager } from './AccountManager';
import { accountType } from '../typings/database';

export class Manager {
    private coins = new CoinsManager(database, {
        type: 'global'
    });
    private client: AmethystClient;
    private accounts: AccountsManager;

    constructor(client: AmethystClient) {
        this.client = client;

        this.start();
    }
    public getData<T = account<'global'> & accountType>(user_id: string): T {
        const coins = this.coins.getData({ user_id }) ?? { coins: 0, bank: 0, user_id };
        const data = this.accounts.user(user_id);

        return Object.assign(coins, data) as T;
    }
    public async register(user_id: string, options: { username: string }) {
        if (this.accounts.exists(user_id)) return true;

        await this.accounts.register(user_id, options);
        this.coins.addCoins({
            user_id,
            coins: 0
        });

        return true;
    }
    public exists(user_id: string) {
        return this.accounts.exists(user_id);
    }
    public addHeartQuarter(user_id: string) {
        return this.accounts.addHeartQuarter(user_id);
    }
    private async start() {
        await checkDatabase();
        await this.coins.start();

        this.accounts = new AccountsManager();
    }
}
