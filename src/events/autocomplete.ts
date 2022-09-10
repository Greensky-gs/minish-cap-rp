import { AutocompleteInteraction } from "discord.js";
import { client } from "..";
import { Event } from "../structures/Event";

export default new Event('interactionCreate', (interaction: AutocompleteInteraction) => {
    if (interaction.isAutocomplete()) {
        const data = {
            commande: client.commands.map(x => ({ name: x.name, value: x.name }))
        };

        const choices: {name: string, value: string}[] = data[interaction.commandName];
        
        const focused = interaction.options.getFocused(true);

        const responded = choices.filter(x => x.name.toLowerCase().startsWith(focused.value));
        interaction.respond(responded);
    }
})