import { ColorResolvable } from "discord.js";

export const support = "https://discord.gg/Qt9Ns3uvYe";
export const invite = "https://discord.com/api/oauth2/authorize?client_id=850039025762172968&permissions=137439267904&scope=bot%20applications.commands";
export const accentColor = '#a79d96' as ColorResolvable;
export const dir = (fileName: string) => fileName.endsWith('.ts') ? 'src' : 'dist';

export const data = {support, invite, accentColor, dir};