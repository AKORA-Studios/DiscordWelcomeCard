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
![Image](welcome.png)

<br /><br /><br />