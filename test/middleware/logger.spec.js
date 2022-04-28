const winston = require('winston');
const logger = require('../../src/middleware/logger');

jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({})),
  format: { json: () => 'json' },
  transports: {
    File: class File {
    },
  },
}));

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

  it('adds a winston logger', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(winston.createLogger).toHaveBeenCalled();
  });

  it('configures the logger with an options object', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(winston.createLogger).toHaveBeenCalledWith(logger.options);
  });

  it('has options loglevel "info", json format and a single transport', () => {
    expect(logger.options.level).toEqual('info');
    expect(logger.options.format).toEqual('json');
    expect(logger.options.transports.length).toEqual(1);
  });
});
