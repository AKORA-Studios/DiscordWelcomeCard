#  Discord Welcome Card
[![NPM](https://nodei.co/npm/discord-welcome-card.png?downloads=true&stars=true)](https://www.npmjs.com/package/discord-welcome-card)

Simple Goodbye and welcome cards

##  Example Usage 

![Example Welcome](https://media.discordapp.net/attachments/753474862693089300/802981356589154324/welcome.png)
```
const Discord = require("discord.js");
const client = new Discord.Client();
const {welcomeImage, goodbyeImage} = require('discord-welcome-card')

client.on("message", async message => {
    message.channel.send('', await welcomeImage(message.member))
})
```

##  Example Usage 2

![Example 2 Welcome](https://cdn.discordapp.com/attachments/753474862693089300/802981806604943370/welcome.png)

```
const Discord = require("discord.js");
const client = new Discord.Client();
const {welcomeImage, goodbyeImage} = require('discord-welcome-card')

client.on("message", async message => {
    message.channel.send('', await welcomeImage(message.member, 'dark'))
})
```
