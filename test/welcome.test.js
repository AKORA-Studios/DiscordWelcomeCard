const { welcomeImage } = require('../lib');
const { images, MAX_DIFF, size } = require('./util');
const { member, opts } = require('./mock');

test('Welcome Card - Default', async () => {
  const gen = await welcomeImage(member),
    comp = images.welcome.default,
    sizeDiff = Math.abs(size(gen) - size(comp));

  expect(sizeDiff).toBeLessThanOrEqual(MAX_DIFF);
});

test('Welcome Card - Full', async () => {
  const gen = await welcomeImage(member, opts),
    comp = images.welcome.default,
    sizeDiff = Math.abs(size(gen) - size(comp));

  expect(sizeDiff).toBeLessThanOrEqual(MAX_DIFF);
});
