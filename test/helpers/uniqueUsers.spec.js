const uniqueUsers = require('../../src/helpers/uniqueUsers');

describe('uniqueUsers', () => {
  it('is a function', () => {
    expect(typeof uniqueUsers).toEqual('function');
  });
});
