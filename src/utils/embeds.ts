import { EmbedBuilder, User } from "discord.js";
import { accentColor } from "./data";

function basic(user: User, addAccentColor?: boolean) {
    const embed = new EmbedBuilder()
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL({ forceStatic: false }) })
    
    if (addAccentColor === true) embed.setColor(accentColor);
    return embed;
};

export const classic = basic;