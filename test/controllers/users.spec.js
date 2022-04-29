const usersController = require('../../src/controllers/users');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');

jest.mock('../../src/clients/users', () => ({
  getUsers: jest.fn(),
  getUsersInLondon: jest.fn(),
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
    usersController(req, res, next);
    expect(res.send).toHaveBeenCalled();
  });

  it('calls next if there is an error sending response', () => {
    const errorRes = {
      send: () => {
        throw new Error('an error');
      },
    };
    usersController(req, errorRes, next);
    expect(next).toHaveBeenCalled();
  });

  it('calls the two client funcions and returns a promise', () => {
    usersController(req, res, next)
      .then(() => {
        expect(getUsers).toHaveBeenCalled();
        expect(getUsersInLondon).toHaveBeenCalled();
      });
  });
});
