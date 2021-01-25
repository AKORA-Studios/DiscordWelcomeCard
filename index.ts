import { GuildMember, MessageAttachment } from "discord.js";
import { createCanvas, loadImage, CanvasRenderingContext2D, Canvas } from 'canvas';
import path from 'path';

export interface Theme {
    name: string;
    color: string;
    image: string;
}

const themes: Theme[] = [
    { name: 'dark', color: '#ffffff', image: 'dark.png' },
    { name: 'sakura', color: '#7d0b2b', image: 'sakura.png' },
    { name: 'blue', color: '#040f57', image: 'blue.png' },
    { name: 'bamboo', color: '#137a0d', image: 'bamboo.png' },
    { name: 'desert', color: '#000000', image: 'desert.png' },
    { name: 'code', color: '#ffffff', image: 'code.png' },
]

/** 
 * @param {string | Buffer} theme 
 */
function theme2Img(theme: string) {
    let canvasTheme = themes.find(t => t.name === theme)
    //if (!canvasTheme) throw 'Invalid theme! Use: ' + themeArray.map(v => v.name).join(' | ');

    if (canvasTheme) return loadImage(path.join(__dirname, 'images', canvasTheme.image))
    else {
        return loadImage(theme)
    }
}







export const modules = {
    welcomeText: (ctx: CanvasRenderingContext2D, canvas: Canvas) => {
        ctx.font = '30px sans-serif';
        ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);
    },

    goodbyeText: (ctx: CanvasRenderingContext2D, canvas: Canvas) => {
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

/**
 * @param {GuildMember} member The GuildMember that joined the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
export async function welcomeImage(member: GuildMember, theme = 'sakura') {
    let canvasTheme = themes.find(t => t.name === theme.toLowerCase())
    if (!canvasTheme) throw 'Invalid theme! Use: ' + themes.map(v => v.name).join(' | ');

    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await theme2Img(theme);

    ctx.drawImage(background, 0, 0)
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = canvasTheme.color;
    ctx.strokeStyle = canvasTheme.color;

    modules.welcomeText(ctx, canvas);
    modules.userText(ctx, canvas, member);
    modules.memberCount(ctx, canvas, member)
    modules.avatarImg(ctx, canvas, member);

    return new MessageAttachment(canvas.toBuffer(), 'welcome.png')
}

/**
 * @param {GuildMember} member The GuildMember that left the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
export async function goodbyeImage(member: GuildMember, theme = 'sakura') {
    let canvasTheme = themes.find(t => t.name === theme.toLowerCase())
    if (!canvasTheme) throw 'Invalid theme! Use: ' + themes.map(v => v.name).join(' | ');

    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await theme2Img(theme);
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = canvasTheme.color;
    ctx.strokeStyle = canvasTheme.color;

    modules.goodbyeText(ctx, canvas);
    modules.userText(ctx, canvas, member);
    modules.avatarImg(ctx, canvas, member);

    return new MessageAttachment(canvas.toBuffer(), 'goodbye.png')
}

/** 
 * @param {string} str 
 */
function getFontSize(str: string) {
    let fontSize = 35;
    if (str.length >= 19) fontSize = 28
    if (str.length >= 24) fontSize = 22
    if (str.length >= 29) fontSize = 18

    return fontSize
}