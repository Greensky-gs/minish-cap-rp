import { ActionRowBuilder, ActionRowComponentData, ButtonBuilder, ButtonStyle, ComponentEmojiResolvable } from "discord.js"

type buttonOptions = {
    label: string,
    type: ButtonStyle,
    customId: string,
    emoji?: ComponentEmojiResolvable,
    disabled?: boolean,
    url?: string
};
const classic = (options: buttonOptions) => {
    const btn = new ButtonBuilder()
        .setLabel(options.label)
        .setCustomId(options.customId)
        .setStyle(options.type)          
        .setDisabled(options.disabled ?? false)
    
    if (options.emoji) btn.setEmoji(options.emoji);
    if (options.url) btn.setURL(options.url);

    return btn;
}

export const basic = classic;
export const yes = () => {
    return classic({ label: 'Oui', type: ButtonStyle.Success, customId: 'yes' });
};
export const no = () => {
    return classic({ label: 'Non', type: ButtonStyle.Danger, customId: 'no' });
};
export const actionRow = (components: ActionRowComponentData[]) => {
    return new ActionRowBuilder({ components });
}