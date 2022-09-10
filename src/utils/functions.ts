import { ActionRowBuilder, ButtonBuilder, ButtonStyle, InteractionReplyOptions, Message } from "discord.js";
import { RPGInteraction } from "../typings/commandType";
import emojis from '../utils/emojis.json';
import { actionRow, basic } from "./buttons";

// Typage
type randomOptions = {
    max?: number;
    min?: number;
};
type paginationOptions = {
    interaction: RPGInteraction,
    dialogue: string[],
    userId: string,
    username: string
};

// Export
export const random = (options: randomOptions) => {
    let max = options.max ?? 100;
    let min = options.min ?? 0;
    
    if (max === min) return max;
    if (max < min) {
        let old = max;
        max = min;
        min = old;
    };

    return Math.floor(Math.random() * max - min) + min;
};
export const pagination = async({ interaction, dialogue, userId, username }: paginationOptions) => {
    const fnt = async(params: InteractionReplyOptions) => {
        if (interaction.replied) {
            return await interaction.editReply(params).catch(() => {});
        } else {
            return await interaction.reply(params).catch(() => {});
        };
    };

    let index = 0;
    const generateContent = () => {
        let line: string = dialogue[index].replace(/{username}/g, username);

        Object.keys(emojis).forEach((key) => {
            line = line.replace(new RegExp(`{${key}}`, 'g'), emojis[key]);
        });

        return line;
    };
    const generateButtons = () => {
        return actionRow([ basic({ emoji: '⬅️', disabled: index === 0, customId: 'previous', type: ButtonStyle.Secondary }), basic({ emoji: '➡️', customId: 'next', type: ButtonStyle.Secondary }) ]) as ActionRowBuilder<ButtonBuilder>
    };

    const msg = await fnt({ content: generateContent(), components: [ generateButtons() ], fetchReply: true }) as Message<true>;
}