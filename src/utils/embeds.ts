import { EmbedBuilder, User } from "discord.js";

function basic(user: User) {
    return new EmbedBuilder()
        .setTimestamp()
        .setFooter({ text: user.username, iconURL: user.displayAvatarURL({ forceStatic: false }) })
};

export const classic = basic;