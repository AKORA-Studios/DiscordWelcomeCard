# WelcomeCard
 Discord Welcome Card
```
const Discord = require("discord.js");
const {welcomeImage,goodbyeImage} = require('welcome-card')

const client = new Discord.Client();
client.on("message", async message => {
    message.channel.send('', new Discord.MessageAttachment(welcomeImage(message.member), 'welcome.png'))
})
```