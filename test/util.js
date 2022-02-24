const { join } = require('path');
const { readFileSync: read } = require('fs');
const { createHash } = require('crypto');

const path = (s) => join(__dirname, s);

const images = {
  welcome: {
    default: read(path('images/welcome_default.png')),
    full: read(path('images/welcome_full.png')),
  },
  goodbye: {
    default: read(path('images/goodbye_default.png')),
    full: read(path('images/goodbye_full.png')),
  },
};

function hash(data) {
  return createHash('sha256').update(data).digest('base64');
}

module.exports = { images, hash };
