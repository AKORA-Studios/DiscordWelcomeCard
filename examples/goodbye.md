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
![Image](welcome.png)

<br /><br /><br />