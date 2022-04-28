const { getUsers } = require('../../src/clients/users');

describe('getUsersr', () => {
  it('is a function', () => {
    expect(typeof getUsers).toEqual('function');
  });
});
