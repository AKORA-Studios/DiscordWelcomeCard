[![NPM Version](https://img.shields.io/npm/v/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM License](https://img.shields.io/npm/l/discord-welcome-card?color=00DEC8&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)
[![Github Size](https://img.shields.io/github/repo-size/AKORA-Studios/DiscordWelcomeCard?color=00DEC8&label=SIZE&style=for-the-badge)](https://www.npmjs.com/package/discord-welcome-card)

#  Discord Welcome Card
Simple Goodbye and welcome cards

## Examples
###  Welcome Card

```javascript
const Discord = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    //Generating the actual welcome Card
    const image = await welcomeImage(message.member);

    message.channel.send(new Discord.MessageAttachment(image, 'welcome.png'))
});

client.login('Your-Bot-Token');
```
![Image](examples/welcome2.png)

<br />


###  Goodbye Card

```javascript
const Discord = require("discord.js");
const { goodbyeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    //Generating the actual welcome Card
    const image = await goodbyeImage(message.member, 'code');

    message.channel.send(new Discord.MessageAttachment(image, 'welcome.png'))
});

client.login('Your-Bot-Token');
```
![Image](examples/goodbye2.png)

<br /><br /><br />

###  Custom Card

```javascript
const Discord = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
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

<br />

##  Changelog
| Version  | Content |
| ------------- | ------------- |
| 1.1.4 | new card backgrounds  |
| 1.1.5 | Added Auto Size  |
| 2.0.0 | Switched to typescript  |
| 2.0.1 | Added Custom Card Function  |
| 2.0.2 | Added more typings  |
| 2.1.0 | Added Custom Themes and Fonts  |
| 2.1.1 | Added Custom Functions to CanvasContext |
| 3.0.0 | Switched to `options-syntax` |
| 3.1.0 | Moved theme into options |
| 3.2.0 | Added `blur` |
| 3.3.0 | Added `round` |
| 3.3.1 | Renamed to `rounded` |
| 3.4.0 | Removed `hex-color-validation` |
| 3.5.0 | Added `gradient` |
| 3.5.1 | Fixxed broken Image |
| 3.6.0 | Removed `member` argument in `drawCard` |
| 3.7.0 | Removed `member` argument in `drawCard` |
| 3.7.1 | Fixxed options in `welcomeImage` Function |

