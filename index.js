const { createCanvas, loadImage } = require('canvas')
const path = require('path')
const { MessageAttachment, GuildMember } = require("discord.js");

const themeArray = [
    { name: 'dark', color: '#ffffff', image: 'dark.png' },
    { name: 'sakura', color: '#7d0b2b', image: 'sakura.png' },
    { name: 'blue', color: '#040f57', image: 'blue.png' },
    { name: 'bamboo', color: '#137a0d', image: 'bamboo.png' },
    { name: 'desert', color: '#000000', image: 'desert.png' },
    { name: 'code', color: '#ffffff', image: 'code.png' },
]

const themeMap = new Map()
themeArray.forEach(t => {
    themeMap.set(t.name, { color: t.color, image: t.image })
})

/** 
 * @param {string | Buffer} theme 
 */
function theme2Img(theme) {
    let canvasTheme = themeMap.get(theme.toLowerCase())
    //if (!canvasTheme) throw 'Invalid theme! Use: ' + themeArray.map(v => v.name).join(' | ');

    if (canvasTheme) return loadImage(path.join(__dirname, 'images', canvasTheme.image))
    else {
        return loadImage(theme)
    }
}


/**
 * @param {GuildMember} member The GuildMember that joined the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
exports.welcomeImage = async function (member, theme = 'sakura') {
    let canvasTheme = themeArray.find(t => t.name === theme.toLowerCase())
    if (!canvasTheme) throw 'Invalid theme! Use: ' + themeArray.map(v => v.name).join(' | ');

    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await theme2Img(theme);
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = `${getFontSize(member.user.tag)}px sans-serif`
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`${member.user.tag}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.font = '24px sans-serif'
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`MemberCount: ${member.guild.memberCount}`, canvas.width / 2.7, canvas.height / 1.3);

    ctx.strokeStyle = canvasTheme.color
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(canvas.height / 2, canvas.height / 2, canvas.height / 2.5, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'welcome.png')
}

/**
 * @param {GuildMember} member The GuildMember that left the Guild.
 * @param {string} theme Theme of the card, this is optional
 */
exports.goodbyeImage = async function (member, theme = 'sakura') {
    let canvasTheme = themeArray.find(t => t.name === theme.toLowerCase())
    if (!canvasTheme) throw 'Invalid theme! Use: ' + themeArray.map(v => v.name).join(' | ');

    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await theme2Img(theme);
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`Goodbye,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = `${getFontSize(member.user.tag)}px sans-serif`
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`${member.user.tag}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.strokeStyle = canvasTheme.color
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(canvas.height / 2, canvas.height / 2, canvas.height / 2.5, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'goodbye.png')
}

/** 
 * @param {string} str 
 */
function getFontSize(str) {
    let fontSize = 35;
    if (str.length >= 19) fontSize = 28
    if (str.length >= 24) fontSize = 22
    if (str.length >= 29) fontSize = 18

    return fontSize
}
