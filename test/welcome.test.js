const { welcomeImage } = require('../lib');
const { images, hash } = require('./util');
const { member, opts } = require('./mock');

test('Welcome Card - Default', async () => {
  expect(hash(await welcomeImage(member))).toBe(hash(images.welcome.default));
});

test('Welcome Card - Full', async () => {
  expect(hash(await welcomeImage(member, opts))).toBe(hash(images.welcome.full));
});
