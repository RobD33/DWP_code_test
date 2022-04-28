const errorHandler = require('../../src/middleware/errorHandler');

describe('errorHandler', () => {
  it('is a function', () => {
    expect(typeof errorHandler).toEqual('function');
  });

  it('logs the error', () => {
    const req = {
      logger: {
        error: jest.fn(),
      },
    };
    const res = {};
    const next = jest.fn();
    const error = new Error('an error');

    errorHandler(error, req, res, next);
    expect(req.logger.error).toHaveBeenLastCalledWith('error', { message: error.message });
    expect(next).not.toHaveBeenCalled();
  });

  it('sends an error response', () => {
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
    const next = jest.fn();
    const error = new Error('an error');

    errorHandler(error, req, res, next);
    expect(res.status).toHaveBeenLastCalledWith(500);
    expect(send).toHaveBeenLastCalledWith({ error: 'an error' });
  });
});
