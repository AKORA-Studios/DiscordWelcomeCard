import { GuildMember } from 'discord.js';
import { themes, baseCard, Cardopts, ImageResolvable, Color } from './util';


export type RankCardOptions = {
    /** Select a theme with some default options */
    theme?: (keyof typeof themes),
    level?: number;
    progressBar?: {
        progress: number,
        maxProgress?: number,
        color?: Color,
        background?: ImageResolvable
    },
    /** Options for the text on the card */
    text?: Cardopts['text'],
    /** Options for the avatar */
    avatar?: Cardopts['avatar']
} & Omit<Cardopts, 'width' | 'height' | 'avatar' | 'text'>

async function drawCard(options: RankCardOptions): Promise<Buffer> {
    const opts = {
        ...options,
        width: 700,
        height: 250,
        text: options.text ?? { },
        avatar: options.avatar ?? { }
    }

    if (opts.theme) {
        const theme = themes[opts.theme];
        if (!theme) throw new Error('Invalid theme: ' + opts.theme);

        opts.text.color ??= theme.color;
        opts.background ??= theme.image;
    }

    const canvas = await baseCard(opts);

    return canvas.toBuffer('image/png');
}


export async function rankCard(member: GuildMember, opts: RankCardOptions = { }): Promise<Buffer> {
    opts.text ??= { }
    opts.text.title ??= `Welcome to this server,`;
    opts.text.text ??= `${member.user.tag}!`;
    opts.text.subtitle ??= `MemberCount: ${member.guild.memberCount}`;

    opts.avatar ??= { };
    opts.avatar.image ??= member.user.displayAvatarURL({ format: 'png' });

    return await drawCard(opts);
}