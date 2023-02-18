import { CoinsManager } from 'coins-manager';
import { checkDatabase, database } from '../utils/database';
import { AmethystClient } from 'amethystjs';
import { AccountsManager } from './AccountManager';

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
    private async start() {
        await checkDatabase();
        await this.coins.start();

        this.accounts = new AccountsManager();
    }
}
