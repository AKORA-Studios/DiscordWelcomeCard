[![NPM Version](https://img.shields.io/npm/v/discord-welcome-card.svg?maxAge=3600)](https://www.npmjs.com/package/discord-welcome-card)
[![NPM Downloads](https://img.shields.io/npm/dt/discord-welcome-card.svg?maxAge=3600)](https://www.npmjs.com/package/discord-welcome-card)
<br />
[![NPM](https://nodei.co/npm/discord-welcome-card.png?downloads=true&stars=true)](https://www.npmjs.com/package/discord-welcome-card)


#  Discord Welcome Card
Simple Goodbye and welcome cards

## Examples
###  Welcome Card
```javascript
const { Client} = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');

const client = new Client();

client.on("message", async message => {
    message.channel.send('', await welcomeImage(message.member, 'code'))
});

client.login('your token here');
```
![Image](examples/welcome.png)

<br />


###  Goodbye Card
```javascript
const { Client} = require("discord.js");
const { goodbyeImage } = require('discord-welcome-card');

const client = new Client();

client.on("message", async message => {
    message.channel.send('', await goodbyeImage(message.member, 'code'))
});

client.login('your token here');
```
![Image](examples/goodbye.png)

<br /><br /><br />



##  Changelog
| Version  | Content |
| ------------- | ------------- |
| 1.1.4  | new card backgrounds  |
| 1.1.5  | Added Auto Size  |
