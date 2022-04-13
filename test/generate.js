const { join } = require('path');
const { writeFileSync: write, readFileSync } = require('fs');
const { welcomeImage, goodbyeImage, drawCard, staticCard } = require('../');
const { member, opts, avatarOpts } = require('./mock');
const path = (s) => join(__dirname, s);

const op = { ...opts, static: 'Q' };
async function run() {
  try {
    write(path('images/custom_full.png'), await (await staticCard(op)).toBuffer('image/png'));
    await drawCard(op);
    await drawCard(op);
    await drawCard(op);
    //write(path('images/welcome_default.png'), await welcomeImage(member));
    //write(path('images/welcome_full.png'), await welcomeImage(member, opts));
    //write(path('images/goodbye_default.png'), await goodbyeImage(member));
    //write(path('images/goodbye_full.png'), await goodbyeImage(member, opts));
  } catch (e) {
    throw e;
  }
}

run().then(() => process.exit(0));
