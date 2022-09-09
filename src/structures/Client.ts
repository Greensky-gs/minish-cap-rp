import { ApplicationCommandDataResolvable, Client, ClientEvents, Collection } from 'discord.js';
import { database } from '../typings/database';
import { createConnection } from 'mysql';
import { readdirSync } from 'fs';
import { commandOptions } from '../typings/commandType';
import { Event } from './Event';

export class RPGClient extends Client {
	#path: string = __filename.endsWith('.ts') ? 'src' : 'dist';
    db: database;
    commands: Collection<string, commandOptions> = new Collection();

	constructor() {
		super({
			intents: ['GuildMembers', 'Guilds']
		});
	}
    start() {
        this.login(process.env.token);
    }
    loadModules() {
        this.connectDb();
        this.loadCommands();
        this.loadEvents();
    }
    connectDb() {
        this.db = createConnection({
            password: process.env.DB_PASSWORD,
            user: process.env.DB_USER,
            database: process.env.DB,
            host: process.env.DB_HOST
        });

        this.db.connect((error: string) => {
            if (error)
                throw error;
        });
    }
    loadCommands() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];

        readdirSync(`./${this.#path}/commands`).forEach((fileName) => {
            const file: commandOptions = require(`../commands/${fileName}`).default;

            slashCommands.push(file);
            this.commands.set(file.name, file);
        });

        this.on('ready', () => {
            this.application.commands.set(slashCommands);
        })
    }
    loadEvents() {
        readdirSync(`./${this.#path}/events`).forEach((fileName) => {
            const file: Event<keyof ClientEvents> = require(`../events/${fileName}`);

            this.on(file.event, file.run);
        });
    }
};