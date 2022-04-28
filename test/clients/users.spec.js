const { getUsers } = require('../../src/clients/users');

describe('getUsers', () => {
  it('is a function', () => {
    expect(typeof getUsers).toEqual('function');
  });

  it('returns a promise', () => {
    return getUsers()
      .then((response) => {
        expect(response).toBeTruthy();
      });
  });
});
