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
    const image = await welcomeImage(message.member, 'code');

    message.channel.send(new Discord.MessageAttachment(image, 'welcome.png'))
});

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

client.login('your token here');
```
![Image](examples/goodbye2.png)

<br /><br /><br />



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
