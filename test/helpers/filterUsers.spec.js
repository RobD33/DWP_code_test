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

  it('filters out a user and returns a user near london in an array', () => {
    const london = { latitude: 51.5074, longitude: 0.1272 }; // source: https://www.google.com/search?q=centre+london+coordinates
    const distance = 80467.2; // 50 miles in meters
    const userOne = {
      latitude: 51.4,
      longitude: 0.1,
    };
    const userTwo = {
      latitude: 100,
      longitude: 100,
    };
    const users = [userOne, userTwo];
    const actual = filterUsers(users, london, distance);
    expect(actual).toEqual([userOne]);
  });

  it('filters out multiple users and returns users near london in an array', () => {
    const london = { latitude: 51.5074, longitude: 0.1272 }; // source: https://www.google.com/search?q=centre+london+coordinates
    const distance = 80467.2; // 50 miles in meters
    const userOne = {
      latitude: 51.4,
      longitude: 0.1,
    };
    const userTwo = {
      latitude: 100,
      longitude: 100,
    };
    const userThree = {
      latitude: 123,
      longitude: -55,
    };
    const userFour = {
      latitude: 51.9,
      longitude: -0.4765,
    };
    const users = [userOne, userTwo, userThree, userFour];
    const actual = filterUsers(users, london, distance);
    expect(actual).toEqual([userOne, userFour]);
  });
});
