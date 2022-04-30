const { join } = require('path');
const { writeFileSync: write, readFileSync, writeFileSync } = require('fs');
const { Text, drawCard, staticCard, LinearGradient } = require('../');
const path = (s) => join(__dirname, s);

const grad = new LinearGradient(
  {
    color: '#f00',
    offset: 0,
  },
  { color: '#00f', offset: 1 }
);

/** @type {import('../').CardOptions} */
const op = {
  avatar: {
    outlineWidth: 10,
    outlineColor: grad,
    image: readFileSync(path('images/avatar.png')),
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
};
async function run() {
  try {
    let buff = (await staticCard(op)).toBuffer('image/png');
    await drawCard(op);
    await drawCard(op);
    buff = await drawCard(op);
    writeFileSync(path('images/custom_full.png'), buff);
    //write(path('images/welcome_default.png'), await welcomeImage(member));
    //write(path('images/welcome_full.png'), await welcomeImage(member, opts));
    //write(path('images/goodbye_default.png'), await goodbyeImage(member));
    //write(path('images/goodbye_full.png'), await goodbyeImage(member, opts));
  } catch (e) {
    throw e;
  }
}

run(); //.then(() => process.exit(0));
