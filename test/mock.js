const { Gradient } = require('@discord-card/core');
const { join } = require('path');
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

/** @type {import('../lib').CardOptions} */
const opts = {
  avatar: {
    outlineWidth: 10,
    outlineColor: new Gradient('linear', { offset: 0, color: '#2d1dba' }, { offset: 1, color: '#2d1dba' }),
  },
  blur: 2,
  border: false,
  rounded: false,
  theme: 'circuit',
  text: {
    color: '#1add89',
    subtitle: 'YourFancy Subtitle without Emojis',
    text: 'Some EMojis☑️❌🇮🇶',
    title: 'Your huge title',
  },
};

module.exports = {
  member,
  opts,
  avatar,
};
