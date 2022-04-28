const usersController = require('../../src/controllers/users');

describe('usersRouter', () => {
  const req = {};
  const res = {
    send: jest.fn(),
  };
  const next = jest.fn()
  it('is a function', () => {
    expect(typeof usersController).toEqual('function');
  });

  it('sends a response', () => {
    usersController(req, res, next);
    expect(res.send).toHaveBeenCalled();
  })
});
