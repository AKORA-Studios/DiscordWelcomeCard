#  Discord Welcome Card
![Example Welcome](https://cdn.discordapp.com/attachments/753474862693089300/802937562833879060/welcome.png)

```
const Discord = require("discord.js");
const client = new Discord.Client();
const {welcomeImage, goodbyeImage} = require('discord-welcome-card')

client.on("message", async message => {
    message.channel.send('', await welcomeImage(message.member))
})
```