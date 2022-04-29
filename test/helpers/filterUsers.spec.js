const filterUsers = require('../../src/helpers/filterUsers');

describe('filterUsers', () => {
  it('is a function', () => {
    expect(typeof filterUsers).toEqual('function');
  });

  it('returns a user near london in an array', () => {
    const london = { latitude: 51.5074, longitude: 0.1272 }; // source: https://www.google.com/search?q=centre+london+coordinates
    const distance = 80467.2; // 50 miles in meters
    const users = [
      {
        id: 1,
        latitude: 51.4,
        longitude: 0.1,
      },
    ];
    const actual = filterUsers(users, london, distance);
    expect(actual).toEqual(users);
  });
});
