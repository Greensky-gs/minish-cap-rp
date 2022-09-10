import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "../structures/Event";
import { RPGInteraction } from "../typings/commandType";

export default new Event('interactionCreate', (inter) => {
    if (inter.isCommand()) {
        const interaction = inter as unknown as RPGInteraction;

        const cmd = interaction.client.commands.get(interaction.commandName);
        if (!cmd) return;

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
                    
                }
            })
        } else {

        }
    }
})