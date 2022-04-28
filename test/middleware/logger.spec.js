const winston = require('winston');
const logger = require('../../src/middleware/logger');

jest.mock('winston', () => {
  const add = jest.fn();
  return {
    createLogger: jest.fn(() => ({
      add,
    })),
    format: {
      json: () => 'json',
      simple: () => 'simple',
    },
    transports: {
      File: class File {},
      Console: class Console {},
    }
  };
});

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

  it('adds a console transport in dev environment', () => {
    const req = {};
    const res = {};
    const next = jest.fn();
    process.env.NODE_ENV = 'dev';
    logger(req, res, next);
    expect(winston.createLogger().add).toHaveBeenCalled();
  })
});
