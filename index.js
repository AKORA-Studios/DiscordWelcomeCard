const { createCanvas, loadImage } = require('canvas')
const path = require('path')
const { MessageAttachment, GuildMember } = require("discord.js");

const themeArray = [
    { name: 'dark', color: '#ffffff', image: 'dark.png' },
    { name: 'sakura', color: '#7d0b2b', image: 'sakura.png' },
    { name: 'blue', color: '#040f57', image: 'blue.png' },
    { name: 'bamboo', color: '#137a0d', image: 'bamboo.png' },
    { name: 'desert', color: '#000000', image: 'desert.png' },
]

const themeMap = new Map()
themeArray.forEach(t => {
    themeMap.set(t.name, { color: t.color, image: t.image })
})

function CheckName(str) {
    if (str.length < 19) return str
    let oldArrayString = []
    let newArrString = []

    oldArrayString = str.split('#')
    newArrString.push(oldArrayString[0].substr(0, 14))
    newArrString.push(oldArrayString[1])
    return newArrString.join('#')
}

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
 * @param {GuildMember} member 
 * @param {string | Buffer} theme 
 */
exports.welcomeImage = async function (member, theme = 'sakura') {
    let canvasTheme = themeMap.get(theme.toLowerCase())
    if (!canvasTheme);//throw 'Invalid theme! Use: ' + themeArray.map(v => v.name).join(' | ');

    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await theme2Img(theme);
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.font = '24px sans-serif'
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`MemberCount: ${member.guild.memberCount}`, canvas.width / 2.7, canvas.height / 1.3);

    ctx.strokeStyle = canvasTheme.color
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'welcome.png')
}

exports.goodbyeImage = async function (member) {
    if (!theme) theme = 'sakura'
    let canvasTheme = themeMap.get(theme.toLowerCase())
    if (!canvasTheme) throw 'Invalid theme! Use: sakura | dark | bamboo | desert | blue'
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await loadImage(path.join(__dirname, canvasTheme.image))
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`Goodbye,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = canvasTheme.color
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.strokeStyle = canvasTheme.color
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return new MessageAttachment(canvas.toBuffer(), 'goodbye.png')
}