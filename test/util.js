const { join } = require('path');
const { readFileSync: read } = require('fs');

const path = (s) => join(__dirname, s);

const images = {
  welcome: {
    default: read(path('images/welcome_default.png')),
    full: read(path('images/welcome_full.png')),
  },
};

module.exports = { member, images };
