/**
 * This card was designed and developed by @AmitKumarHQ
 */
const { drawCard, Text } = require('discord-welcome-card');
const { writeFile } = require('fs/promises');
const { join } = require('path');
const { member, avatar } = require('../mock');

async function run() {
  const image = await drawCard({
    theme: 'dark',
    blur: false,
    rounded: true,
    text: {
      title: new Text('Welcome!', 240, 70).setFontSize(32),
      text: new Text(member.user.tag, 240, 150).setFontSize(64),
      color: `#DDDDDD`,
      font: 'Panton Black Caps',
    },
    avatar: {
      image: avatar,
      outlineWidth: 5,
      outlineColor: `#DDDDDD`,
    },
    card: {
      background: join(__dirname, './background.png'),
    }
  });

  writeFile(join(__dirname, './card.png'), image);
}
run();
