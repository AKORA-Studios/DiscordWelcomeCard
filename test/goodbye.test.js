const { goodbyeImage } = require('../lib');
const { images, hash } = require('./util');
const { member, opts } = require('./mock');

test('Goodbye Card - Default', async () => {
  expect(hash(await goodbyeImage(member))).toBe(hash(images.goodbye.default));
});

test('Goodbye Card - Full', async () => {
  expect(hash(await goodbyeImage(member, opts))).toBe(hash(images.goodbye.full));
});
