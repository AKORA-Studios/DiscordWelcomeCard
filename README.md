[![NPM Version](https://img.shields.io/npm/v/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM License](https://img.shields.io/npm/l/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![Github Size](https://img.shields.io/github/repo-size/AKORA-Studios/DiscordWelcomeCard?color=00DEC8&label=SIZE&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)

**[![widget](https://discord.com/api/guilds/553942677117337600/widget.png?style=banner2)](https://discord.gg/Emk2udJ)**


#  Discord Welcome Card
Simple easy-to-use Goodbye and welcome cards for your discord Bot. The version changelog could be found at [changelog](CHANGELOG.md).


## Features
* ⛩️ 3 default themes (circuit, code, dark)
* 🍭 gradient color support
* 🖼️ custom background support
*  📎 customizable cards (blur, rounded edges)
* 🗛 multiple font support
* 💿 rounded edges / border
* ⭕ avatar outline

(Note that all example codes below are for discord.js Version 12. Example usage code in Version 13 or higher, is provided in [this file](Usage.md))


## Card Options
```javascript
  /** Select a theme with some default options */
    theme?: (keyof typeof themes);
    /** Options for the text on the card */
    text?: {
        /** Text in the Top */
        title?: string;
        /**Text in the middle(big) */
        text?: string;
        /** Text on the bottom */
        subtitle?: string;
        /** Font Color / Gradient */
        color?: Color;
        /** Custom Font */
        font?: string;
    },
    /** Options for the avatar */
    avatar?: {
        /** The Avatar Image, can be a URL/Canvas/Image or Buffer */
        image?: ImageResolvable;
        /** Width of the outline around the avatar in px (0-50) */
        outlineWidth?: number;
        /** Color of the outline / Gradient */
        outlineColor?: Color;
    }
    /** Override the Background, can be a URL/Canvas/Image or Buffer  */
    background?: ImageResolvable;
    /** If the background should be blurred (true -> 3) */
    blur?: boolean | number;
    /** When enabled a blurred border is drawn, enabled by default */
    border?: boolean;
    /** If enabled the edges will be rounded, enabled by default */
    rounded?: boolean;
    //custom?: ModuleFunction;
```

## Default themes & font colors
Dark
![Dark Theme](https://cdn.discordapp.com/attachments/753474834004049970/880461624912269352/welcome.png)
Circuit
![Circuit Theme](https://cdn.discordapp.com/attachments/881826427392102401/881868994074800159/welcome.png)
Code
![Code Theme](https://cdn.discordapp.com/attachments/753474836281557063/847803305450274846/goodbye.png)

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

<details><summary> Custom Card </summary>

```javascript
const Discord = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual custom Card
    const image = await drawCard({
            theme: 'dark',
            text: {
                title: 'Title',
                 text: 'Text',
                subtitle: 'Subtitle',
                color: '#aaa6ff'
            },
            avatar: {
                image: message.member.user.avatarURL({ format: 'png' }),
                outlineWidth: 5,
                outlineColor: '#6dc97c'
            },
            blur: true,
            border: true,
            rounded: true
        })
    message.channel.send(new Discord.MessageAttachment(image, 'custom.png'))
});

client.login('Your-Bot-Token');
```
    
![Image](examples/custom2.png)

</details>
 

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
            text: {
                title: 'Title',
                 text: 'Text',
                subtitle: 'Subtitle',
                color:  new Gradient("linear", {
                     color: "#4287f5",
                    offset: 1
                    }, {
                    color: "#f5426f",
                     offset: 0
                     })
            },
            avatar: {
                image: message.member.user.avatarURL({ format: 'png' })
            },
            background: "./image.png",
            blur: true,
            border: true,
            rounded: true
        })
    message.channel.send(new Discord.MessageAttachment(image, 'custom.png'))
});

client.login('Your-Bot-Token');
```
    
</details>    


## Example projects
Some projects written with this package
* [Miyuki](https://github.com/discord-card/Miyuki) (discord.js V13)
