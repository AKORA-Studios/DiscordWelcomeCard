[![NPM Version](https://img.shields.io/npm/v/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM License](https://img.shields.io/npm/l/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![Github Size](https://img.shields.io/github/repo-size/AKORA-Studios/DiscordWelcomeCard?color=00DEC8&label=SIZE&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)

**[![widget](https://discord.com/api/guilds/553942677117337600/widget.png?style=banner2)](https://discord.gg/Emk2udJ)**

<br>

#  Discord Welcome Card
Simple easy-to-use Goodbye and welcome cards for your discord Bot.

<br>

## Features
* ⛩️ 5 default themes (circuit, code, sakura, dark, colorsplash)
* 🍭 gradient color support
* 🖼️ custom background support
* 📎 customizable cards (blur, rounded edges)
* 🗛 multiple font support

(Note that all example codes below are for discord.js Version 12. Example usage code in Version 13 or higher, is provided at [Usage.md](Usage.md))

<br>

## Examples
<details open> 
    <summary>  Welcome Card </summary>

```javascript
const Discord = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual welcome Card
    const image = await welcomeImage(message.member);

    message.channel.send(new Discord.MessageAttachment(image, 'welcome.png'))
});

client.login('Your-Bot-Token');
```
    
![Image](examples/welcome2.png)


</details>

<br />


<details> <summary> Goodbye Card </summary>

```javascript
const Discord = require("discord.js");
const { goodbyeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual goodbye Card
    const image = await goodbyeImage(message.member, 'code');

    message.channel.send(new Discord.MessageAttachment(image, 'goodbye.png'))
});

client.login('Your-Bot-Token');
```
    
![Image](examples/goodbye2.png)
    
</details>
<br />

<details><summary> Custom Card </summary>

```javascript
const Discord = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual custom Card
    const image = await drawCard({
            blur: true,
            title: 'Title',
            theme: 'dark',
            text: 'Text',
            subtitle: 'Subtitle',
            rounded: true,
            border: true,
            avatar: message.member.user.avatarURL({ format: 'png' })
        })
    message.channel.send(new Discord.MessageAttachment(image, 'custom.png'))
});

client.login('Your-Bot-Token');
```
    
![Image](examples/custom2.png)

</details>
    
<br />

<details> <summary> Custom Card (custom Background) </summary>
folder strcuture:

```
folder
|-index.js
|-image.png
```

```javascript
const Discord = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual custom Card
    const image = await drawCard({
            blur: true,
            title: 'Title',
            theme:  {
        image: "./image.png",
        color: new Gradient("linear", {
            color: "#4287f5",
            offset: 1
        }, {
            color: "#f5426f",
            offset: 0
        })
    },
            text: 'Text',
            subtitle: 'Subtitle',
            rounded: true,
            border: true,
            avatar: message.member.user.avatarURL({ format: 'png' })
        })
    message.channel.send(new Discord.MessageAttachment(image, 'custom.png'))
});

client.login('Your-Bot-Token');
```
    
</details>    

<br>

## Example projects
Some projects written with this package
* [Miyuki](https://github.com/discord-card/Miyuki) (discord.js V13)
