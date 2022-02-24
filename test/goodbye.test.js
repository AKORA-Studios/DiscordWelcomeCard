const { goodbyeImage } = require('../lib');
const { images, MAX_DIFF, size } = require('./util');
const { member, opts } = require('./mock');

test('Goodbye Card - Default', async () => {
  const gen = await goodbyeImage(member),
    comp = images.goodbye.default,
    sizeDiff = Math.abs(size(gen) - size(comp));

  expect(sizeDiff).toBeLessThanOrEqual(MAX_DIFF);
});

test('Goodbye Card - Full', async () => {
  const gen = await goodbyeImage(member, opts),
    comp = images.goodbye.default,
    sizeDiff = Math.abs(size(gen) - size(comp));

  expect(sizeDiff).toBeLessThanOrEqual(MAX_DIFF);
});
