import { GuildMember } from 'discord.js';
import { themes, baseCard, Cardopts, ImageResolvable, Color } from './util';
import { createCanvas } from 'canvas';


export type RankCardOptions = {
    /** Select a theme with some default options */
    theme?: (keyof typeof themes),
    /** All texts */
    text?: {
        level?: number,
        rank?: number,
        rankColor?: Color,
        rankBackground?: Color,
        username?: string,
        color?: Color
    },
    progressBar?: {
        progress: number,
        maxProgress: number,
        color?: Color,
        fontColor?: Color,
        background?: Color
    },
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

        //opts.text.color ??= theme.color;
        opts.background ??= theme.image;
    }

    const canvas = createCanvas(opts.width, opts.height),
        ctx = canvas.getContext('2d'),
        [w, h] = [opts.width, opts.height];
    ctx.drawImage(await baseCard(opts), 0, 0);


    ctx.textBaseline = 'middle';

    if (opts.progressBar) { // Progress bar
        const [x, y, wid, hei] = [w * .375, h * 0.7, w * .565, h * .15],
            { progress, maxProgress, background, color, fontColor } = opts.progressBar;

        ctx.save();
        ctx.fillStyle = (background ?? '#ccc').toString(ctx);
        ctx.roundRect(x, y, wid, hei, hei)
            .fill();

        ctx.fillStyle = (color ?? '#eee').toString(ctx);
        ctx.roundRect(x, y, wid * 0.6, hei, hei)
            .fill();

        ctx.textAlign = 'center';
        ctx.fillStyle = (fontColor ?? '#666').toString(ctx);
        ctx.changeFontSize('25px')
            .fillText(`${progress}/${maxProgress}`, x + (wid) / 2, y + (hei / 2));
        ctx.restore();
    }

    if (opts.text) {
        const { level, rank, rankColor, rankBackground, username, color } = opts.text;
        const [x, y, wid, hei] = [w * .375, h * 0.7, w * .565, h * .15];


        if (rank) {
            ctx.save();
            ctx.fillStyle = (rankBackground ?? '#444').toString(ctx);
            ctx.roundRect(
                w * .9 - opts.border, 0 + opts.border,
                w * .1, w * .1,
                options.rounded * h / 2
            ).fill();

            ctx.textAlign = 'center';
            ctx.fillStyle = (rankColor ?? color ?? '#fff').toString(ctx);
            ctx.changeFontSize('25px')
            ctx.fillText(`#${rank}`, w * .95 - opts.border, w * .05 + opts.border);

            ctx.restore();
        }

        if (level) {
            ctx.save();

            ctx.textAlign = 'left';
            ctx.fillStyle = (color ?? '#fff').toString(ctx);
            ctx.changeFontSize('40px')
            ctx.fillText(`Level ${level}`, w * .375, h * .25);

            ctx.restore();
        }

        if (username) {
            ctx.save();

            ctx.textAlign = 'left';
            ctx.fillStyle = (color ?? '#aaa').toString(ctx);
            ctx.changeFontSize('40px')
            ctx.fillText(username, w * .375, h * .5);

            ctx.restore();
        }
    }

    return canvas.toBuffer('image/png');
}


export async function rankCard(member: GuildMember, opts: RankCardOptions = { }): Promise<Buffer> {
    opts.text ??= { }
    opts.text.username ??= member.user.tag;

    opts.avatar ??= { };
    opts.avatar.image ??= member.user.displayAvatarURL({ format: 'png' });

    opts.rounded = .3;

    return await drawCard(opts);
}