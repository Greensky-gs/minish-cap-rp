import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../structures/Event";
import { RPGInteraction } from "../typings/commandType";
import { classic } from "../utils/embeds";

export default new Event('interactionCreate', (inter) => {
    if (inter.isCommand()) {
        const interaction = inter as unknown as RPGInteraction;

        const cmd = interaction.client.commands.get(interaction.commandName);
        if (!cmd) return;

        if (cmd.dm === false && !interaction.guild) return interaction.reply("Cette commande n'est pas exécutable en messages privés").catch(() => {});

        const run = () => {
            cmd.run({
                args: interaction.options as unknown as CommandInteractionOptionResolver[],
                interaction,
                client: interaction.client
            });
        };
        if (cmd.needAccount === true) {
            interaction.client.db.query(`SELECT user_id FROM accounts WHERE user_id="${interaction.user.id}"`, (err, req) => {
                if (err) return console.log(err);

                if (req.length === 0) {
                    return interaction.reply({ embeds: [ classic(interaction.user)
                        .setTitle("Compte requis")
                        .setDescription(`Pour utiliser cette commande, vous devez avoir commencé l'aventure`)
                        .setColor('#ff0000')
                    ] }).catch(() => {});
                };
                run();
            })
        } else {
            run();
        }
    }
})