const { LinearGradient } = require('@discord-card/core');
const { readFileSync } = require('fs');
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

const grad = new LinearGradient(
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
    image: readFileSync(avatar),
    imageRadius: 0.8,
    borderRadius: 0.75,
  },
  blur: 2,
  border: false,
  rounded: false,
  theme: 'circuit',
  text: {
    color: '#1add89',
    title: new Text('humongus title', 240, 70).setFontSize(55).setStyle('#fff').stroke(),
    text: 'Some EMojis☑️❌🇮🇶',
    subtitle: new Text('YourFancy long humongus giant horse text is is´nsalnel long', 240, 180)
      .setFontSize(30)
      .setGradient(grad)
      .multiline()
      .setRect(400, 100),
  },
};

module.exports = {
  member,
  opts,
  avatar,
};
