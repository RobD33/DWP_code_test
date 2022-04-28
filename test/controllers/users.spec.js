const usersController = require('../../src/controllers/users');

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
});
