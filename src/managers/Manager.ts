import { CoinsManager } from 'coins-manager';
import { checkDatabase, database } from '../utils/database';
import { AmethystClient } from 'amethystjs';

export class Manager {
    private coins = new CoinsManager(database, {
        type: 'global'
    });
    private client: AmethystClient;

    constructor(client: AmethystClient) {
        this.client = client;

        this.start();
    }
    private async start() {
        await checkDatabase();
        this.coins.start();
    }
}
