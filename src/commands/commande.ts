import { ApplicationCommandOptionType } from "discord.js";
import { client } from "..";
import { Command } from "../structures/Command";
import { dir } from "../utils/data";
import { classic } from "../utils/embeds";

export default new Command({
    name: 'commande',
    description: "Affiche les informations d'une commande",
    dm: true,
    needAccount: false,
    run: async({ interaction, args }) => {
        await interaction.deferReply();
        const cmd = interaction.client.commands.get(args.getString('commande'));
        
        await client.application.commands.fetch();

        const embed = classic(interaction.user, true)
            .setTitle("Commande")
            .setDescription(`</${cmd.name}:${client.application.commands.cache.find(x => x.name === cmd.name).id}> : ${cmd.description}`)
            .addFields(
                {
                    name: 'Commande de jeu',
                    value: (cmd.needAccount ?? false) ? '✅':'❌',
                    inline: true
                },
                {
                    name: 'Exécutable en privé',
                    value: (cmd.dm ?? false) ? '✅':'❌',
                    inline: true
                }
            )
            .setThumbnail('attachment://logo.png')
        
        interaction.editReply({ embeds: [ embed ], files: [ `./${dir(__filename)}/utils/logo.png` ] }).catch(() => {});
    },
    options: [
        {
            name: 'commande',
            description: "Commande que vous voulez voir",
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ]
})