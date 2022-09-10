import { ApplicationCommandOption, ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember } from "discord.js"
import { RPGClient } from "../structures/Client";

export class RPGInteraction extends CommandInteraction {
    member: GuildMember = this.member;
    client: RPGClient = this.client;
}
export type commandRunOptions = {
    interaction: RPGInteraction,
    args: CommandInteractionOptionResolver,
    client: RPGClient
};
export type commandOptions = {
    name: string,
    description: string,
    needAccount: boolean,
    run: (options: commandRunOptions) => any
    dm?:boolean;
    options?: ApplicationCommandOption[],
} & ChatInputApplicationCommandData;