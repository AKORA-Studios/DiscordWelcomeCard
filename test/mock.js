const { Gradient } = require('@discord-card/core');

/** @type {import('../lib').GuildMemberLike} */
const member = {
  user: {
    tag: 'ΛΚΘRΛ#7997',
    displayAvatarURL: ({ format }) => 'https://cdn.discordapp.com/avatars/387655649934311427/01f64003a9ea0a1494a4d07aa23ae64e.' + format,
  },
  guild: {
    memberCount: 420,
  },
};

/** @type {import('../lib').CardOptions} */
const opts = {
  avatar: {
    outlineWidth: 0.3,
    outlineColor: new Gradient('linear', { offset: 0, color: '#fff' }, { offset: 1, color: '#aff' }),
  },
  blur: 2,
  border: false,
  rounded: false,
  theme: 'circuit',
  text: {
    color: '#123456',
    subtitle: 'YourFancy Subtitle without Emojis',
    text: 'Some EMojis☑️❌🇮🇶',
    title: 'Your huge title',
  },
};

module.exports = { member, opts };
