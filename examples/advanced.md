# Advanced Usage
##  Basics 
### The Basic Setup
```js
//Imports...
const { Client} = require("discord.js");
const { drawCard } = require('discord-welcome-card');

const client = new Client();

client.login('your token here');
```

#### The drawCard() Funtion
```js
client.on('message', async (msg) => {
    var card = await drawCard(msg.member, 'code', ['avatarImg']);
    var buffer = card.toBuffer("image/png");


    //Sending the actual File
    msg.channel.send('', new MessageAttachment(buffer, 'card.png'))
})
```

![Image](examples/welcome.png)

<br />








```javascript
client.on('message', async (msg) => {
    var card = await drawCard(msg.member, 'code', ['avatarImg', (ctx, canvas, member) =>  {

    }]);
    var buffer = card.toBuffer("image/png");

    msg.channel.send('', new MessageAttachment(buffer, 'card.png'))
})
```