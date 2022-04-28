const usersController = require('../../src/controllers/users');

describe('usersRouter', () => {
  it('is a function', () => {
    expect(typeof usersController).toEqual('function');
  });
});
