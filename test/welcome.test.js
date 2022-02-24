const { welcomeImage } = require('../lib');
const { images } = require('./util');
const member = require('./member');

test('Create Welcome Card', () => {
  expect(welcomeImage(member)).toBe(images.welcome.default);
});
