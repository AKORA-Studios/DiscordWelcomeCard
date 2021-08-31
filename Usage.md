
## Examples
<details open> 
    <summary>  Welcome Card (circuit) </summary>

```javascript
const { Client, Intents } = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("messageCreate", async message => {
    if(message.author.bot) return
    //Generating the actual welcome Card
    const image = await welcomeImage(message.member, { theme: 'circuit' });

    message.channel.send({ files: [ image ] })
});

client.login('Your-Bot-Token');
```
    
![Image](examples/circuit_welcome.png)


</details>

<br />


<details open> <summary> Goodbye Card </summary>

```javascript
const { Client, Intents } = require("discord.js");
const { goodbyeImage } = require('discord-welcome-card');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("messageCreate", async message => {
    if(message.author.bot) return
    //Generating the actual goodbye Card
    const image = await goodbyeImage(message.member, { theme: 'code' });

    message.channel.send({ files: [ image ] });

client.login('Your-Bot-Token');
```
    
![Image](examples/code_goodbye.png)
    
</details>
<br />

<details open><summary> Custom Card </summary>

```javascript
const { Client, Intents } = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("messageCreate", async message => {
    if(message.author.bot) return
    //Generating the actual custom Card
    const image = await drawCard({
        theme: "circuit",
        text: {
            title: 'Hellloo',
            text: message.author.tag,
            subtitle: 'please read the Rules',
            color: `#88f`
        },
        avatar: {
            image: message.author.displayAvatarURL({ format: 'png' }),
            outlineWidth: 5,
            outlineColor: new Gradient('linear',
                [0, '#33f'],
                [1, '#f33']
            ),
        },
        background: 'https://i.imgur.com/ea9PB3H.png',
        blur: 1,
        border: true,
        rounded: true
    });

    message.channel.send({ files: [ image ] })
});

client.login('Your-Bot-Token');
```
    
![Image](examples/fullCustom.png)

</details>