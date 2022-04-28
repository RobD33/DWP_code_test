const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler', () => {
  const req = {
    logger: {
      error: jest.fn(),
    },
  };
  const send = jest.fn();
  const res = {
    status: jest.fn(() => ({
      send,
    })),
  };

  it('is a function', () => {
    expect(typeof errorHandler).toEqual('function');
  });

  it('logs the error', () => {
    const next = jest.fn();
    const error = new Error('an error');

    errorHandler(error, req, res, next);
    expect(req.logger.error).toHaveBeenLastCalledWith('error', { message: error.message });
    expect(next).not.toHaveBeenCalled();
  });

  it('sends an error response', () => {
    const next = jest.fn();
    const error = new Error('an error');

    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(500);
    expect(send).toHaveBeenLastCalledWith({ error: 'an error' });
  });
});
