const usersController = require('../../src/controllers/users');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');
const filterUsers = require('../../src/helpers/filterUsers');
const uniqueUsers = require('../../src/helpers/uniqueUsers');

jest.mock('../../src/clients/users', () => {
  const userOne = { id: 1 };
  const userTwo = { id: 2 };
  const userThree = { id: 3 };
  const userFour = { id: 4 };

  const getUsersArray = [userOne, userTwo, userThree, userFour];
  const getUsersInLondonArray = [userTwo, userThree];
  return {
    getUsers: jest.fn(() => Promise.resolve(getUsersArray)),
    getUsersInLondon: jest.fn(() => Promise.resolve(getUsersInLondonArray)),
  };
});

jest.mock('../../src/helpers/filterUsers', () => jest.fn(() => {
  const userOne = { id: 1 };
  const userTwo = { id: 2 };

  return [userOne, userTwo];
}));

jest.mock('../../src/helpers/uniqueUsers', () => jest.fn(() => {
  const userOne = { id: 1 };
  const userTwo = { id: 2 };
  const userThree = { id: 3 };
  return [userOne, userTwo, userThree];
}));

describe('usersRouter', () => {
  const req = {};
  const res = {
    send: jest.fn(),
  };
  const next = jest.fn();

  it('is a function', () => {
    expect(typeof usersController).toEqual('function');
  });

  it('sends a response', () => {
    usersController(req, res, next)
      .then(() => {
        expect(res.send).toHaveBeenCalled();
      });
  });

  it('calls next if there is an error sending response', () => {
    const errorRes = {
      send: () => {
        throw new Error('an error');
      },
    };
    usersController(req, errorRes, next)
      .then(() => {
        expect(next).toHaveBeenCalled();
      });
  });

  it('calls the two client functions and return a promise', () => {
    usersController(req, res, next)
      .then(() => {
        expect(getUsers).toHaveBeenCalled();
        expect(getUsersInLondon).toHaveBeenCalled();
      });
  });

  it('calls the two helper functions with the data and returns a promise which sends the result', () => {
    const userOne = { id: 1 };
    const userTwo = { id: 2 };
    const userThree = { id: 3 };
    const userFour = { id: 4 };

    const getUsersArray = [userOne, userTwo, userThree, userFour];
    const filteredUsersArray = [userOne, userTwo];
    const getUsersInLondonArray = [userTwo, userThree];
    const uniqueUsersArray = [userOne, userTwo, userThree];
    usersController(req, res, next)
      .then(() => {
        expect(filterUsers).toHaveBeenCalledWith(
          getUsersArray,
          { latitude: 51.5074, longitude: 0.1272 },
          80467.2,
        );
        expect(uniqueUsers).toHaveBeenCalledWith([...filteredUsersArray, ...getUsersInLondonArray]);
        expect(res.send).toHaveBeenLastCalledWith({ data: uniqueUsersArray });
      });
  });
});
