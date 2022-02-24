const { join } = require('path');
const { writeFileSync: write } = require('fs');
const member = require('./member');
const { welcomeImage, goodbyeImage } = require('../lib');

const path = (s) => join(__dirname, s);

async function run() {
  write(path('images/welcome_default.png'), await welcomeImage(member));
  write(path('images/welcome_full.png'), await welcomeImage(member));
  write(path('images/goodbye_default.png'), await goodbyeImage(member));
  write(path('images/goodbye_full.png'), await goodbyeImage(member));
}

run().then(() => process.exit(0));
