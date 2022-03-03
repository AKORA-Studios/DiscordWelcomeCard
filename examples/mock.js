const { join } = require('path');
const path = (...s) => join(__dirname, ...s);

const avatar = path('./avatar.png');

/** @type {import('discord-welcome-card').GuildMemberLike} */
const member = {
  user: {
    tag: 'Dyno#3861',
    displayAvatarURL: ({ format }) => avatar,
  },
  guild: {
    memberCount: 420,
  },
};

module.exports = {
  member,
  avatar,
};
