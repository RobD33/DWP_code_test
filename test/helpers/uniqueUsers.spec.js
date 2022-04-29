const uniqueUsers = require('../../src/helpers/uniqueUsers');

describe('uniqueUsers', () => {
  it('is a function', () => {
    expect(typeof uniqueUsers).toEqual('function');
  });

  it('returns a user in an array', () => {
    const user = { id: 1 };
    const users = [user];
    const actual = uniqueUsers(users);
    expect(actual).toEqual(users);
  });

  it('filters out a duplicate user in an array', () => {
    const user = { id: 1 };
    const users = [user, { ...user }];
    const actual = uniqueUsers(users);
    expect(actual).toEqual([user]);
  });
});
