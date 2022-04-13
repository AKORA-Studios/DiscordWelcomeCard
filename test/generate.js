const { join } = require('path');
const { writeFileSync: write, readFileSync } = require('fs');
const { welcomeImage, goodbyeImage, drawCard } = require('../');
const { member, opts, avatarOpts } = require('./mock');
const path = (s) => join(__dirname, s);

async function run() {
  try {
    write(path('images/custom_full.png'), await drawCard({ ...opts, static: 'Q' }));
    write(path('images/custom_full.png'), await drawCard({ ...opts, static: 'Q' }));
    write(path('images/custom_full.png'), await drawCard({ ...opts, static: 'Q' }));
    //write(path('images/welcome_default.png'), await welcomeImage(member));
    //write(path('images/welcome_full.png'), await welcomeImage(member, opts));
    //write(path('images/goodbye_default.png'), await goodbyeImage(member));
    //write(path('images/goodbye_full.png'), await goodbyeImage(member, opts));
  } catch (e) {
    throw e;
  }
}

run().then(() => process.exit(0));
