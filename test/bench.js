const { suite, add, cycle, complete } = require('benny');
const { loadImage } = require('@napi-rs/canvas');
const { readFileSync } = require('fs');
const { readFile } = require('fs/promises');
const { join } = require('path');
const path = (s) => join(__dirname, s);
const avatarPath = path('images/avatar.png');
const avatarBuffer = readFileSync(avatarPath);

const { welcomeImage, drawCard, LinearGradient, Text } = require('../');
const mock = require('./mock');

const readingImages = () =>
  suite(
    'File reading',
    add('from Filesystem', async () => {
      await readFile(avatarPath);
    }),

    add('from CDN', async () => {
      await loadImage('https://cdn.discordapp.com/icons/945062121757089824/ba533c0a374ba2854f9df8aebbf6865b.png');
    }),

    cycle(),
    complete()
  );

const grad = new LinearGradient(
  {
    color: '#f00',
    offset: 0,
  },
  { color: '#00f', offset: 1 }
);
/** @type {import('../').CardOptions} */
const opts = {
  avatar: {
    outlineWidth: 10,
    outlineColor: grad,
    imageRadius: 0.8,
    borderRadius: 0.75,
  },
  card: { blur: 2, border: false, rounded: false },
  generation: {
    static: 'Bench',
  },
  theme: 'circuit',
  text: {
    color: '#1add89',
    title: new Text('humongus title', 240, 70).setFontSize(55).setStyle('#fff').stroke(),
    text: 'Some EMojis☑️❌🇮🇶',
    subtitle: new Text('YourFancy long humongus giant horse text is is´nsalnel long', 240, 180).setFontSize(30).setGradient(grad),
    /*
      .multiline({
        width: 400,
        height: 100,
      }),
      */
  },
};

const drawingCards = () =>
  suite(
    'Drawing Cards',
    /*
    add('Default welcome', async () => {
      await welcomeImage(mock.member);
    }),
    */
    add('Empty', async () => {
      await drawCard({});
    }),
    add('Custom', async () => {
      await drawCard(opts);
    }),
    add('Blur', async () => {
      await drawCard({
        blur: 1,
      });
    }),

    cycle(),
    complete()
  );

const blurring = () =>
  suite(
    'Blurring',
    add('Blur 1', async () => {
      await drawCard({
        blur: 1,
        generation: { static: 'Blur1' },
      });
    }),
    add('Blur Default + JPEG', async () => {
      await drawCard({
        blur: true,
        generation: { static: 'BlurDef', format: 'image/jpeg' },
      });
    }),
    add('Blur 5', async () => {
      await drawCard({
        blur: 5,
        generation: { static: 'Blur5' },
      });
    }),

    cycle()
  );

const main = async () => {
  //await readingImages();
  await drawingCards();
  await blurring();
};

main();
