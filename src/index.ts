import { AmethystClient } from 'amethystjs';
import { Partials } from 'discord.js';
import { config } from 'dotenv';

config();

export const client = new AmethystClient(
    {
        intents: ['Guilds'],
        partials: [Partials.Message]
    },
    {
        token: process.env.token,
        debug: true,
        commandsFolder: './dist/commands',
        eventsFolder: './dist/events',
        autocompleteListenersFolder: './dist/autocompletes',
        preconditionsFolder: './dist/preconditions',
        buttonsFolder: './dist/buttons',
        waitForDefaultReplies: {
            everyone: `Vous n'êtes pas autorisé à interagir avec ce message`,
            user: "Vous n'êtes pas autorisé à interagir avec ce message"
        }
    }
);

client.start({
    loadAutocompleteListeners: true,
    loadButtons: true,
    loadCommands: true,
    loadEvents: true,
    loadPreconditions: true
});
