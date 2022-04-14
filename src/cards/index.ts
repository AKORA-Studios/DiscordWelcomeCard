import { GuildMemberLike, loadImage } from '@discord-card/skia-core';
import { CardOptions } from '../types';
import { drawCard } from './hydrate';

export async function welcomeImage(member: GuildMemberLike, options: CardOptions = {}): Promise<Buffer> {
  const opts = { ...options };
  opts.text ??= {};
  opts.avatar ??= {};

  opts.text.title ??= `Welcome to this server,`;
  opts.text.text ??= `${member.user.tag}!`;
  opts.text.subtitle ??= `MemberCount: ${member.guild.memberCount}`;
  opts.avatar.image ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

  return await drawCard(opts);
}

export async function goodbyeImage(member: GuildMemberLike, options: CardOptions = {}): Promise<Buffer> {
  const opts = { ...options };
  opts.text ??= {};
  opts.avatar ??= {};

  opts.text.title ??= `Goodbye,`;
  opts.text.text ??= `${member.user.tag}!`;
  opts.avatar.image ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

  return await drawCard(opts);
}

export { drawCard };
export { staticCard } from './dry';
