import { GuildMember } from 'discord.js';
import { loadImage } from 'canvas';
import { themes, Color, ImageResolvable, baseCard, Cardopts } from './util';

export type GreetingCardOptionsSS = {
    /** Select a theme with some default options */
    theme?: (keyof typeof themes);
    /** Options for the text on the card */
    text?: {
        /** Text in the Top */
        title?: string;
        /**Text in the middle(big) */
        text?: string;
        /** Text on the bottom */
        subtitle?: string;
        /** Font Color */
        color?: Color;
        /** Custom Font */
        font?: string;
    },
    /** Options for the avatar */
    avatar?: {
        /** The Avatar Image, can be a URL/Canvas/Image or Buffer */
        image?: ImageResolvable;
        /** Width of the outline around the avatar */
        outlineWidth?: number;
        /** Color of the outline */
        outlineColor?: Color;
    }
    /** Override the Background, can be a URL/Canvas/Image or Buffer  */
    background?: ImageResolvable;
    /** If the background should be blurred (true -> 3) */
    blur?: boolean | number;
    /** When enabled a blurred border is drawn, enabled by default */
    border?: boolean;
    /** If enabled the edges will be rounded, enabled by default */
    rounded?: boolean;
    //custom?: ModuleFunction;
}

export type GreetingCardOptions = {
    /** Select a theme with some default options */
    theme?: (keyof typeof themes),
    /** Options for the text on the card */
    text?: Cardopts['text'],
    /** Options for the avatar */
    avatar?: Cardopts['avatar']
} & Omit<Cardopts, 'width' | 'height' | 'avatar' | 'text'>

async function drawCard(options: GreetingCardOptions): Promise<Buffer> {
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


export async function welcomeImage(member: GuildMember, opts: GreetingCardOptions = { }): Promise<Buffer> {
    opts.text ??= { }
    opts.text.title ??= `Welcome to this server,`;
    opts.text.text ??= `${member.user.tag}!`;
    opts.text.subtitle ??= `MemberCount: ${member.guild.memberCount}`;

    opts.avatar ??= { };
    opts.avatar.image ??= member.user.displayAvatarURL({ format: 'png' });

    return await drawCard(opts);
}


export async function goodbyeImage(member: GuildMember, opts: GreetingCardOptions = { }): Promise<Buffer> {
    opts.text ??= { }
    opts.text.title ??= `Goodbye,`;
    opts.text.text ??= `${member.user.tag}!`;

    opts.avatar ??= { };
    opts.avatar.image ??= member.user.displayAvatarURL({ format: 'png' });

    return await drawCard(opts);
}