/* eslint-disable max-classes-per-file */
const winston = require('winston');
const uuid = require('uuid');
const logger = require('../../src/middleware/logger');

jest.mock('uuid', () => ({
  v1: jest.fn(() => 'generated uuid'),
}));

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
    },
  };
});

const headers = {
  'correlation-id': 'a correlation id',
};
const req = {
  get: (name) => headers[name],
};

describe('middleware logger', () => {
  it('is a function', () => {
    expect(typeof logger).toEqual('function');
  });

  it('adds a logger to the request object', () => {
    const res = {};
    const next = jest.fn();

    logger(req, res, next);
    expect(req.logger).toBeTruthy();
    expect(next).toHaveBeenCalled();
  });

  it('adds a winston logger', () => {
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(winston.createLogger).toHaveBeenCalled();
  });

  it('configures the logger with an options object', () => {
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
    const res = {};
    const next = jest.fn();
    process.env.NODE_ENV = 'dev';
    logger(req, res, next);
    expect(winston.createLogger().add).toHaveBeenCalled();
  });

  it('does not add a console transport in production environment', () => {
    jest.clearAllMocks();
    const res = {};
    const next = jest.fn();
    process.env.NODE_ENV = 'production';
    logger(req, res, next);
    expect(winston.createLogger().add).not.toHaveBeenCalled();
  });

  it('sets a correlationId to req object if one is passed in headers', () => {
    const res = {};
    const next = jest.fn();
    logger(req, res, next);
    expect(req.correlationId).toEqual('a correlation id');
  });

  it('generates a new correlation id if one is not passed', () => {
    const emptyHeaders = {};
    const noHeadersReq = {
      get: (name) => emptyHeaders[name],
    };
    const res = {};
    const next = jest.fn();
    logger(noHeadersReq, res, next);
    expect(uuid.v1).toHaveBeenCalled();
    expect(noHeadersReq.correlationId).toEqual('generated uuid');
  });
});
