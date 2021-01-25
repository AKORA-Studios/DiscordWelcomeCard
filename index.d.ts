import { GuildMember, MessageAttachment } from "discord.js";
/**
 * @param {GuildMember} member The GuildMember that joined the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
export declare function welcomeImage(member: GuildMember, theme?: string): Promise<MessageAttachment>;
/**
 * @param {GuildMember} member The GuildMember that left the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
export declare function goodbyeImage(member: GuildMember, theme?: string): Promise<MessageAttachment>;
