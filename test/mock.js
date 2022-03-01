const { Gradient } = require('@discord-card/core');
const { join } = require('path');
const { Text } = require('../lib');
const path = (s) => join(__dirname, s);

const avatar = path('images/avatar.png');

/** @type {import('../lib').GuildMemberLike} */
const member = {
  user: {
    tag: 'ΛΚΘRΛ#7997',
    displayAvatarURL: ({ format }) => avatar,
  },
  guild: {
    memberCount: 420,
  },
};

const grad = new Gradient(
  'linear',
  {
    color: '#f00',
    offset: 0,
  },
  { color: '#00f', offset: 1 }
);

/** @type {import('../lib').CardOptions} */
const opts = {
  avatar: {
    outlineWidth: 10,
    outlineColor: grad,
  },
  blur: 2,
  border: false,
  rounded: false,
  theme: 'circuit',
  text: {
    color: '#1add89',
    title: new Text('humongus title', 240, 70).setFontSize('55px').setStyle('#fff').stroke(),
    text: 'Some EMojis☑️❌🇮🇶',
    subtitle: new Text('YourFancy long humongus giant horse text is is´nsalnel long', 240, 180)
      .stroke(false)
      .setFontSize(30)
      .setGradient(grad)
      .multiline(),
  },
};

module.exports = {
  member,
  opts,
  avatar,
};
