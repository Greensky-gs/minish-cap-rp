import { Message } from "discord.js";
import { Command } from "../structures/Command";
import { classic } from "../utils/embeds";
import { random } from "../utils/functions";

export default new Command({
    name: 'help',
    description: "Affiche la page d'aide du bot",
    dm: true,
    needAccount: false,
    run: async({ interaction }) => {
        const components = [];
        if (random({ max: 10 }) === 5) components.push()

        interaction.reply({ embeds: [ classic(interaction.user)
            .setTitle("Page d'aide")
            .setDescription(`Voici la page d'aide du bot.\nVous pouvez y trouver chaque commande.\n\n${interaction.client.commands.map((cmd) => `\`${cmd.name}\` ${cmd.description}`).join('\n')}`)
            .setColor('Orange')
        ] });
    }
})