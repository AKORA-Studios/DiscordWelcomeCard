
## Examples
<details open> 
    <summary>  Welcome Card </summary>

```javascript
const Discord = require("discord.js");
const { welcomeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual welcome Card
    const image = await welcomeImage(message.member);

    message.channel.send({ files: [new Discord.MessageAttachment(image, 'welcome.png')] })
});

client.login('Your-Bot-Token');
```
    
![Image](examples/welcome2.png)


</details>

<br />


<details open> <summary> Goodbye Card </summary>

```javascript
const Discord = require("discord.js");
const { goodbyeImage } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
    //Generating the actual goodbye Card
    const image = await goodbyeImage(message.member, 'code');

    message.channel.send({ files: [new  Discord.MessageAttachment(image, 'goodbye.png')] });

client.login('Your-Bot-Token');
```
    
![Image](examples/goodbye2.png)
    
</details>
<br />

<details open><summary> Custom Card </summary>

```javascript
const Discord = require("discord.js");
const { drawCard } = require('discord-welcome-card');
const client = new Discord.Client();

client.on("message", async message => {
    if(message.author.bot) return
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
    message.channel.send({ files: [new  Discord.MessageAttachment(image, 'custom.png')] })
});

client.login('Your-Bot-Token');
```
    
![Image](examples/custom2.png)

</details>