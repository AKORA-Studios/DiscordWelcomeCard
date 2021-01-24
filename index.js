const { createCanvas, loadImage } = require('canvas')
const path = require('path')

var themeMap = new Map()
const themeArray = [
    { name: 'sakura', color: '#7d0b2b', image: 'sakura.png' },
]
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

async function welcomeImage(member) {
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await loadImage(path.join(__dirname, 'sakura.png'))
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`Welcome to this server,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.font = '24px sans-serif'
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`MemberCount: ${member.guild.memberCount}`, canvas.width / 2.7, canvas.height / 1.3);

    ctx.strokeStyle = '#7d0b2b'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)

    return canvas.toBuffer()
    //  return new MessageAttachment(canvas.toBuffer(), 'welcome.png')
}

async function goodbyeImage(member, theme) {
    const canvas = createCanvas(700, 250)
    const ctx = canvas.getContext('2d')

    const background = await loadImage(path.join(__dirname, 'sakura.png'))
    const avatar = await loadImage(member.user.displayAvatarURL({ format: 'png' }))

    ctx.drawImage(background, 0, 0)

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '30px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`Goodbye,`, canvas.width / 2.7, canvas.height / 3.5);

    ctx.font = '35px sans-serif';
    ctx.fillStyle = '#7d0b2b'
    ctx.fillText(`${CheckName(member.user.tag)}!`, canvas.width / 2.7, canvas.height / 1.8);

    ctx.strokeStyle = '#7d0b2b'
    ctx.lineWidth = 6
    ctx.beginPath()
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avatar, 25, 25, 200, 200)
    return canvas.toBuffer()
    // return new MessageAttachment(canvas.toBuffer(), 'goodbye.png')
}

module.exports = { welcomeImage, goodbyeImage }