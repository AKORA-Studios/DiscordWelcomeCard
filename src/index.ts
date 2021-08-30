import { GuildMember } from 'discord.js';
import { createCanvas, loadImage, CanvasRenderingContext2D as ctx2D, Canvas, Image } from 'canvas';
import { writeFileSync } from 'fs';
import { join } from 'path';
export * from '@discord-card/core';

const production = true;


function getFontSize(str: string) {
    if (str.length < 18) return 30;
    return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

const root = join(__dirname, '..', 'images')
export var themes = {
    'dark': { color: '#ffffff', image: join(root, 'dark.png') },
    'sakura': { color: '#7d0b2b', image: join(root, 'sakura.png') },
    'circuit': { color: '#ffffff', image: join(root, 'circuit.png') },
    'colorsplash': { color: '#137a0d', image: join(root, 'colorsplash.png') },
    'code': { color: '#ffffff', image: join(root, 'code.png'), font: 'Source Sans Pro' },
}

export type ModuleFunction = (ctx: ctx2D) => any
export type CardOptions = {
    /** Select a theme with some default options */
    theme?: (keyof typeof themes);
    text?: {
        /** Text in the Top */
        title?: string;
        /**Text in the middle(big) */
        text?: string;
        /** Text on the bottom */
        subtitle?: string;
    },
    /** The Avatar Image, can be a URL/Canvas/Image or Buffer */
    avatar?: Canvas | Image | Buffer | string;
    /** Override the Background, can be a URL/Canvas/Image or Buffer  */
    background?: Canvas | Image | Buffer | string;
    /** If the background should be blurred (true -> 3) */
    blur?: boolean | number;
    /** When enabled a blurred border is drawn */
    border?: boolean;
    /** If enabled the edges will be rounded */
    rounded?: boolean;
    //custom?: ModuleFunction;
}




var count = 0;
function snap(c: Canvas) {
    if (!production) writeFileSync(`./testing/snapshots/${count}.png`, c.toBuffer('image/png'));
    count++;
}


export async function drawCard(options: CardOptions): Promise<Buffer> {
    const w = 700, h = 250;
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext('2d');
    ctx.w = ctx.width = w;
    ctx.h = ctx.height = h;

    //@ts-ignore
    var theme: Theme = options.theme ?? 'code';

    var background: Image;


    //Parsing the Theme
    if (typeof theme === 'string') {
        //Builtin Theme
        theme = themes[theme];
        if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

        background = await loadImage(theme.image);
    } else {
        //Loading the Background
        try {
            background = await loadImage(theme.image);
        } catch (e) { throw new Error('Invalid Path or Buffer provided.') }
    }

    ctx.theme = theme;
    const b = 10; //Border

    //Background
    snap(canvas);
    if (options.rounded) ctx.roundRect(0, 0, w, h, h / 15);
    else ctx.rect(0, 0, w, h);
    ctx.clip();

    if (options.border) {
        ctx.drawImage(background, 0, 0, w, h);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;

        ctx.blur(3);
    }


    snap(canvas);
    //Rounded Edges
    if (options.border) {
        if (options.rounded) ctx.roundRect(b, b, w - 2 * b, h - 2 * b, h / 15);
        else ctx.rect(b, b, w - (2 * b), h - (2 * b));
        ctx.clip();
    } else {
        if (options.rounded) ctx.roundRect(0, 0, w, h, h / 15).clip();
        else ctx.rect(0, 0, w, h);
    }


    var temp: Canvas | Image = background;
    if (options.blur) {
        var blur = createCanvas(w, h), blur_ctx = blur.getContext('2d') as ctx2D;
        blur_ctx.drawImage(background, 0, 0, w, h);

        if (typeof options.blur === 'boolean') blur_ctx.blur(3);
        else blur_ctx.blur(options.blur);

        temp = blur;
    }
    if (options.border) ctx.drawImage(temp, b, b, w - b * 2, h - b * 2);
    else ctx.drawImage(temp, 0, 0, w, h);


    snap(canvas);


    //Setting Styles
    ctx.fillStyle = theme.color.toString(ctx);
    ctx.strokeStyle = theme.color.toString(ctx);
    ctx.font = '30px ' + (theme.font ? theme.font : 'sans-serif');


    //Drawing
    //Title
    ctx.changeFontSize('30px')
        .fillText(options.text?.title ?? '', ctx.width / 2.7, ctx.height / 3.5);

    //Text
    ctx.changeFontSize(getFontSize(options.text?.text ?? '') + 'px')
        .fillText(options.text?.text ?? '', ctx.width / 2.7, ctx.height / 1.8);

    //Subtitle
    ctx.changeFontSize('25px')
        .fillText(options.text?.subtitle ?? '', ctx.width / 2.7, ctx.height / 1.3);

    //Avatar Image
    const radius = h / 2.5;

    ctx.lineWidth = 6
    ctx.beginPath();
    ctx.arc(h / 2, h / 2, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    if (options.avatar) {
        if (options.avatar instanceof Canvas || options.avatar instanceof Image)
            ctx.drawImage(options.avatar, (h / 2) - radius, (h / 2) - radius, radius * 2, radius * 2);
        else if (typeof options.avatar === 'string' || options.avatar instanceof Buffer)
            ctx.drawImage(await loadImage(options.avatar), (h / 2) - radius, (h / 2) - radius, radius * 2, radius * 2);
        else throw new Error('Invalid Avatar Argument');
    }

    snap(canvas);


    return canvas.toBuffer('image/png');
}


export async function welcomeImage(member: GuildMember, options: CardOptions = { }): Promise<Buffer> {
    const opts = { ...options }
    opts.text ??= { }
    opts.text.title ??= `Welcome to this server,`;
    opts.text.text ??= `${member.user.tag}!`;
    opts.text.subtitle ??= `MemberCount: ${member.guild.memberCount}`;
    opts.theme ??= 'code';
    opts.avatar ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

    return await drawCard(opts);
}


export async function goodbyeImage(member: GuildMember, options: CardOptions = { }): Promise<Buffer> {
    const opts = { ...options }
    opts.text ??= { }
    opts.text.title ??= `Goodbye,`;
    opts.text.text ??= `${member.user.tag}!`;
    opts.theme ??= 'code';
    opts.avatar ??= await loadImage(member.user.displayAvatarURL({ format: 'png' }));

    return await drawCard(opts);
}