import { ActionRowBuilder, ActionRowComponentData, AttachmentBuilder, AttachmentPayload, ButtonBuilder, ButtonStyle, JSONEncodable } from "discord.js";
import { Command } from "../structures/Command";
import { actionRow, basic } from "../utils/buttons";
import { invite, support } from "../utils/data";
import { classic } from "../utils/embeds";
import { random } from "../utils/functions";

export default new Command({
    name: 'help',
    description: "Affiche la page d'aide du bot",
    dm: true,
    needAccount: false,
    run: async({ interaction }) => {
        const components: ActionRowComponentData[] = [];
        if (random({ max: 10 }) === 5) components.push(basic({ label: "Support", type: ButtonStyle.Link, url: support }));
        if (random({ max: 10 }) === 5) components.push(basic({ label: 'Invitation', type: ButtonStyle.Link, url: invite }));

        const rows = [];
        if (components.length > 0) rows.push(actionRow(components) as ActionRowBuilder<ButtonBuilder>);

        const files = [ `./${__filename.endsWith('.ts') ? 'src' : 'dist'}/utils/logo.png` ];

        interaction.reply({ embeds: [ classic(interaction.user)
            .setTitle("Page d'aide")
            .setDescription(`Voici la page d'aide du bot.\nVous pouvez y trouver chaque commande.\n\n${interaction.client.commands.map((cmd) => `\`${cmd.name}\` ${cmd.description}`).join('\n')}`)
            .setColor('Orange')
            .setAuthor({ iconURL: 'attachment://logo.png', name: 'Draver Industries' })
        ], components: rows, files }).catch(console.log);
    }
})