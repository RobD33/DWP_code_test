const logger = require('../../src/middleware/logger');

describe('middleware logger', () => {
  it('is a function', () => {
    expect(typeof logger).toEqual('function');
  });

  it('adds a logger to the request object', () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    logger(req, res, next);
    expect(req.logger).toBeTruthy();
    expect(next).toHaveBeenCalled();
  });
});
