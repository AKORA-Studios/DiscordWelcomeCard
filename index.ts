import { GuildMember } from "discord.js";
import { createCanvas, loadImage, CanvasRenderingContext2D as Nodectx2D, Canvas, Image } from 'canvas';
import { join } from 'path';

class ctx2D extends Nodectx2D {
    width: number; w: number;
    height: number; h: number;
    theme: Theme;

    //Dummy implementtion for type support
    roundRect(x: number, y: number, w: number, h: number, r: number): this { return this; }
    changeFont(font: string): this { return this; }
    changeFontSize(size: string): this { return this; }
}

//@ts-ignore
Nodectx2D.prototype.roundRect = function (x: number, y: number, w: number, h: number, r: number) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
}

//@ts-ignore
Nodectx2D.prototype.changeFont = function (font: string) {
    var fontArgs = this.font.split(' ');
    this.font = fontArgs[0] + ' ' + font; /// using the first part
    return this;
}

//@ts-ignore
Nodectx2D.prototype.changeFontSize = function (size: string) {
    var fontArgs = this.font.split(' ');
    this.font = size + ' ' + fontArgs.slice(1).join(' '); /// using the last part
    return this;
}






export interface Theme {
    color: string;
    image: string | Buffer;
    font?: string;
}

export type ThemeType = (keyof typeof themes) | Theme;
const hexcolor = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/;


const root = join(__dirname, 'images')
export var themes = {
    'dark': { color: '#ffffff', image: join(root, 'dark.png') },
    'sakura': { color: '#7d0b2b', image: join(root, 'sakura.png') },
    'blue': { color: '#040f57', image: join(root, 'blue.png') },
    'bamboo': { color: '#137a0d', image: join(root, 'bamboo.png') },
    'desert': { color: '#000000', image: join(root, 'desert.png'), font: 'Segoe Print' },
    'code': { color: '#ffffff', image: join(root, 'code.png'), font: 'Source Sans Pro' },
}



function getFontSize(str: string) {
    if (str.length < 18) return 30;
    return (600 * Math.pow(str.length, -1.05)).toFixed(0);
}

export type ModuleFunction = (ctx: ctx2D, member: GuildMember) => any
export type CardOptions = {
    theme?: ThemeType;
    title?: string;
    text?: string;
    subtitle?: string;
    avatar?: Canvas | Image;
    custom?: ModuleFunction;
}


export async function drawCard(member: GuildMember, options: CardOptions): Promise<Buffer> {
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d') as ctx2D;
    ctx.w = ctx.width = 700;
    ctx.h = ctx.height = 250;

    //@ts-ignore
    var theme: Theme = options.theme ?? 'sakura';


    var background: Image;


    //Parsing the Theme
    if (typeof theme === 'string') {
        //Builtin Theme
        theme = themes[theme];
        if (!theme) throw new Error('Invalid theme, use: ' + Object.keys(themes).join(' | '));

        background = await loadImage(theme.image);
    } else {
        //Invalid Color
        if (!theme.color.match(hexcolor)) throw new Error('Invalid Color provided.')

        //Loading the Background
        try {
            background = await loadImage(theme.image);
        } catch (e) { throw new Error('Invalid Path or Buffer provided.') }
    }

    ctx.theme = theme;

    ctx.roundRect(0, 0, canvas.width, canvas.height, canvas.height / 15);
    ctx.clip();
    ctx.drawImage(background, 0, 0);

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = theme.color;
    ctx.strokeStyle = theme.color;
    ctx.font = '30px ' + (theme.font ? theme.font : 'sans-serif');


    //Drawing
    //Title
    ctx.changeFontSize('30px')
        .fillText(options.title ?? '', ctx.width / 2.7, ctx.height / 3.5);

    //Text
    ctx.changeFontSize(getFontSize(member.user.tag) + 'px')
        .fillText(options.title ?? '', ctx.width / 2.7, ctx.height / 1.8);

    //Subtitle
    ctx.changeFontSize('25px')
        .fillText(options.subtitle ?? '', ctx.width / 2.7, ctx.height / 1.3);

    //Avatar Image
    const { w, h } = ctx;

    const radius = h / 2.5;

    ctx.lineWidth = 6
    ctx.beginPath();
    ctx.arc(h / 2, h / 2, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(options.avatar ?? '', radius / 4, radius / 4, radius * 2, radius * 2)



    return canvas.toBuffer('image/png');
}


export async function welcomeImage(member: GuildMember, theme: ThemeType = 'sakura'): Promise<Buffer> {
    const buff = await drawCard(member, {
        title: `Welcome to this server,`,
        text: `${member.user.tag}!`,
        subtitle: `MemberCount: ${member.guild.memberCount}`,
        avatar: await loadImage(member.user.displayAvatarURL({ format: 'png' }))
    })
    //const attachment = new MessageAttachment(buff, 'welcome.png')
    return buff;
}


export async function goodbyeImage(member: GuildMember, theme: ThemeType = 'sakura'): Promise<Buffer> {
    const buff = await drawCard(member, {
        title: `Goodbye,`,
        text: `${member.user.tag}!`,
        avatar: await loadImage(member.user.displayAvatarURL({ format: 'png' }))
    })
    return buff;
}