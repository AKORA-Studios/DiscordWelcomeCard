const { Client, GatewayIntentBits } = require('discord.js');
const { join } = require('path');
const { writeFileSync: write, readFileSync, writeFileSync } = require('fs');
const { Text, drawCard, LinearGradient, welcomeImage } = require('../');
const path = (s) => join(__dirname, s);

const token = readFileSync(path('../.env')).toString();

const client = new Client({ intents: [] });

const grad = new LinearGradient(
  {
    color: '#f00',
    offset: 0,
  },
  { color: '#00f', offset: 1 }
);

/** @type {(url: string) => import('../').CardOptions} */
const op = (url) => ({
  avatar: {
    outlineWidth: 10,
    outlineColor: grad,
    //image: url,
    imageRadius: 0.8,
    borderRadius: 0.5,
  },
  card: {
    blur: 4,
    border: false,
    rounded: false,
    background: readFileSync(path('images/wallpaper.png')),
  },
  generation: { static: 'Card1', format: 'image/jpeg' },
  theme: 'code',
  text: {
    color: '#1add89',
    title: new Text('humongus title', 240, 70).setFontSize(55).setStyle('#fff').stroke(),
    text: 'Some EMojis☑️❌🇮🇶',
    subtitle: new Text('YourFancy long humongus giant horse text is is´nsalnel long', 240, 180)
      .setFontSize(30)
      .setGradient(grad)
      .multiline(),
    //.setRect(400, 50),
  },
});

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let user = await client.users.fetch('387655649934311427');

  let url = user.displayAvatarURL({
    extension: 'png',
  });

  console.log(url);

  // let buff = await welcomeImage({ user }, op(undefined));

  let buff = await drawCard({
    theme: 'circuit',
    text: {
      title: `Welcome To ()`,
      text: user.username,
      subtitle: `< By LingSystem >`,
      color: `#88f`,
    },
    avatar: {
      image: user.displayAvatarURL({ forceStatic: true, size: 1024, extension: 'png' }),
    },
    card: {
      background: readFileSync(path('images/wallpaper.png')),
      blur: 1,
      border: true,
      rounded: true,
    },
  });

  //let buff = await drawCard(op(url));
  writeFileSync(path('images/custom_full.png'), buff);
  process.exit();
});

client.login(token);
