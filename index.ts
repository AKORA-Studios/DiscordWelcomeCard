import { GuildMember, MessageAttachment } from "discord.js";
import { createCanvas, loadImage, CanvasRenderingContext2D, Canvas, Image } from 'canvas';
import path from 'path';

export interface Theme {
    color: string;
    image: string | Buffer;
}

export type ThemeType = (keyof typeof themes) | Theme;

const themes = {
    'dark': { color: '#ffffff', image: 'dark.png' },
    'sakura': { color: '#7d0b2b', image: 'sakura.png' },
    'blue': { color: '#040f57', image: 'blue.png' },
    'bamboo': { color: '#137a0d', image: 'bamboo.png' },
    'desert': { color: '#000000', image: 'desert.png' },
    'code': { color: '#ffffff', image: 'code.png' },
}



function getFontSize(str: string) {
    if (str.length >= 19) return 28;
    if (str.length >= 24) return 22;
    if (str.length >= 29) return 18;

    return 35
}






export const modules = {
    welcomeText: (ctx, canvas: Canvas, member: GuildMember) => {
        ctx.font = '30px sans-serif';
        ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);
    },

    goodbyeText: (ctx: CanvasRenderingContext2D, canvas: Canvas, member: GuildMember) => {
        ctx.font = '30px sans-serif';
        ctx.fillText(`Goodbye,`, canvas.width / 2.7, canvas.height / 3.5);
    },

    userText: (ctx: CanvasRenderingContext2D, canvas: Canvas, member: GuildMember) => {
        ctx.font = `${getFontSize(member.user.tag)}px sans-serif`
        ctx.fillText(`${member.user.tag}!`, canvas.width / 2.7, canvas.height / 1.8);
    },

    memberCount: (ctx: CanvasRenderingContext2D, canvas: Canvas, member: GuildMember) => {
        ctx.font = '24px sans-serif'
        ctx.fillText(`MemberCount: ${member.guild.memberCount}`, canvas.width / 2.7, canvas.height / 1.3);
    },

    avatarImg: async (ctx: CanvasRenderingContext2D, canvas: Canvas, member: GuildMember) => {
        ctx.lineWidth = 6
        ctx.beginPath();
        ctx.arc(canvas.height / 2, canvas.height / 2, canvas.height / 2.5, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(await loadImage(member.user.displayAvatarURL({ format: 'png' })), 25, 25, 200, 200)
    }
}

export type ModuleFunction = (ctx: CanvasRenderingContext2D, canvas: Canvas, member: GuildMember) => any
export type Module = (keyof typeof modules) | (ModuleFunction)


export async function drawCard(member: GuildMember, theme: ThemeType = 'sakura', mods: Module[]): Promise<Canvas> {
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    var canvasTheme: Theme,
        background: Image;


    //Parsing the Theme
    if (typeof theme === 'string') {
        //Builtin Theme
        canvasTheme = themes[theme];
        if (!canvasTheme) throw new Error('Invalid theme, Use: ' + Object.keys(themes).join(' | '));
    } else {
        //Custom Theme
        canvasTheme = theme;
        background = await loadImage(theme.image);
    }



    ctx.drawImage(background, 0, 0)
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = canvasTheme.color;
    ctx.strokeStyle = canvasTheme.color;

    for (const mod of mods) {
        if (typeof mod === 'string') {
            var func = modules[mod];
            if (!func) throw new Error(`${mod}, is not a valid Module`);
            await func(ctx, canvas, member)
        } else {
            if (typeof mod === 'function') await mod(ctx, canvas, member);
            else throw (new Error(`${mod}, is not a valid Module`));
        }
    }

    return canvas;
}


export async function welcomeImage(member: GuildMember, theme: ThemeType = 'sakura') {
    const canvas = await drawCard(member, theme, ['welcomeText', 'userText', 'memberCount', 'avatarImg'])

    return new MessageAttachment(canvas.toBuffer('image/png'), 'welcome.png')
}


export async function goodbyeImage(member: GuildMember, theme: ThemeType = 'sakura') {
    const canvas = await drawCard(member, theme, ['goodbyeText', 'userText', 'avatarImg'])

    return new MessageAttachment(canvas.toBuffer('image/png'), 'goodbye.png')
}