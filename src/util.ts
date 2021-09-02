import { createCanvas, loadImage, CanvasRenderingContext2D as ctx2D, Canvas, Image } from 'canvas';
import { join } from 'path';
import { Gradient } from '@discord-card/core';



export function getFontSize(str: string) {
    if (str.length < 18) return 30;
    return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

export async function toImage(image: ImageResolvable, name?: string) {
    if (image instanceof Canvas) {
        let img = new Image();
        img.src = (image as Canvas).toDataURL();
        return img;
    } else if (image instanceof Image)
        return image
    else if (typeof image === 'string' || image instanceof Buffer)
        return await loadImage(image)
    else throw new Error('Invalid Image Format for: ' + name ?? 'Image');
}

const root = join(__dirname, '..', 'images')
export var themes = {
    'dark': { color: '#ffffff', image: join(root, 'dark.png') },
    'circuit': { color: '#ffffff', image: join(root, 'circuit.png') },
    'code': { color: '#ffffff', image: join(root, 'code.png'), font: 'Source Sans Pro' },
}

export type Color = string | Gradient;
export type ImageResolvable = Canvas | Image | Buffer | string;






export type Cardopts = {
    width: number,
    height: number,
    /** Options for the text on the card */
    text: {
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
    avatar: {
        /** The Avatar Image, can be a URL/Canvas/Image or Buffer */
        image?: ImageResolvable;
        /** (0-1) Radius of the avatar, default 0.4 (40%) */
        radius?: number;
        /** Width of the outline around the avatar */
        outlineWidth?: number;
        /** Color of the outline */
        outlineColor?: Color;
        /** Position of the Avatar */
        position?: {
            /** (0-1) */
            x: number,
            /** (0-1) */
            y: number
        }
    }
    /** Override the Background, can be a URL/Canvas/Image or Buffer  */
    background?: ImageResolvable;
    /** If the background should be blurred, `3` by default */
    blur?: number;
    /** When enabled a blurred border is drawn, `10` by default */
    border?: number;
    /** (0-1) If enabled the edges will be rounded, `0.1` by default */
    rounded?: number;
}



export async function baseCard(opts: Cardopts): Promise<Canvas> {
    const w = opts.width, h = opts.height,
        canvas = createCanvas(w, h),
        ctx = canvas.getContext('2d');

    ctx.w = ctx.width = w;
    ctx.h = ctx.height = h;
    /** Border width */
    const b = opts.border; //Border

    const background = await toImage(opts.background ?? canvas, 'Background');


    //Background
    if (opts.rounded > 0) ctx.roundRect(0, 0, w, h, (h / 2) * opts.rounded);
    else ctx.rect(0, 0, w, h);
    ctx.clip();

    if (opts.border > 0) {
        ctx.drawImage(background, 0, 0, w, h);
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;

        ctx.blur(3);
    }

    //Rounded Edges
    if (opts.border > 0) {
        if (opts.rounded > 0) {
            ctx.roundRect(
                b, b,
                w - 2 * b, h - 2 * b,
                (h / 2) * opts.rounded
            );
        } else {
            ctx.rect(
                b, b,
                w - (2 * b), h - (2 * b)
            );
        }
        ctx.clip();
    } else {
        if (opts.rounded > 0) ctx.roundRect(0, 0, w, h, (h / 2) * opts.rounded).clip();
        else ctx.rect(0, 0, w, h);
    }


    var temp: Canvas | Image = background;
    if (opts.blur) {
        var blur = createCanvas(w, h), blurCTX = blur.getContext('2d');
        blurCTX.drawImage(background, 0, 0, w, h);

        if (typeof opts.blur === 'boolean') blurCTX.blur(3);
        else blurCTX.blur(opts.blur);

        temp = blur;
    }
    if (opts.border > 0) ctx.drawImage(temp, b, b, w - b * 2, h - b * 2);
    else ctx.drawImage(temp, 0, 0, w, h);

    //Setting Styles
    ctx.fillStyle = (opts.text.color ?? '#fff').toString(ctx);
    //ctx.strokeStyle = theme.color.toString(ctx);
    ctx.font = '30px ' + (opts.text.font ?? 'sans-serif', 'segoe-ui-emoji');


    //Drawing
    //Title
    ctx.changeFontSize('30px')
        .fillText(opts.text.title ?? '', ctx.width / 2.7, ctx.height / 3.5);

    //Text
    ctx.changeFontSize(getFontSize(opts.text.text ?? '') + 'px')
        .fillText(opts.text.text ?? '', ctx.width / 2.7, ctx.height / 1.8);

    //Subtitle
    ctx.changeFontSize('25px')
        .fillText(opts.text.subtitle ?? '', ctx.width / 2.7, ctx.height / 1.3);

    //Avatar Image
    const radius = (opts.avatar.radius ?? 0.4) * h / 2;

    const { avatar } = opts;
    if (avatar) {
        avatar.outlineWidth ??= 0;
        avatar.position ??= { x: 0.5, y: 0.5 };

        const { image: avatarImage, outlineWidth: outWidth, outlineColor, position: p } = avatar;
        p.x = (p.x ?? 0.5) * h;
        p.y = (p.y ?? 0.5) * h;

        ctx.lineWidth = 6
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        if (avatarImage) {
            ctx.drawImage(
                await toImage(avatarImage),
                (p.x - radius) + outWidth, //x
                (p.y - radius) + outWidth, //y
                (radius * 2) - (outWidth * 2), //width
                (radius * 2) - (outWidth * 2) //height
            );
        }

        if (outWidth > 0) {
            ctx.beginPath();
            ctx.arc(
                p.x, p.y,
                radius - (outWidth / 2),
                0, Math.PI * 2, true
            );
            ctx.closePath();

            ctx.lineWidth = outWidth;
            ctx.strokeStyle = (outlineColor ?? '#fff').toString(ctx);

            ctx.stroke();
        }
    }

    return canvas;
}