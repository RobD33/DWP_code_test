require('dotenv').config();
const axios = require('axios');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');

jest.mock('axios');

const logger = {
  info: jest.fn(),
  error: jest.fn(),
};

describe('getUsers', () => {
  axios.get.mockResolvedValue({ status: 200, data: 'some data' });
  it('is a function', () => {
    expect(typeof getUsers).toEqual('function');
  });

  it('returns a promise', () => getUsers(logger)
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsers(logger)
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}users`);
      expect(response).toEqual('some data');
    }));

  it('logs info about a successful call', () => getUsers(logger)
    .then(() => {
      expect(logger.info).toHaveBeenCalledWith({ api: '/users', request_time: expect.anything(), status: 200 });
    }));

  it('logs info about a unsuccessful call', () => {
    axios.get.mockRejectedValueOnce({ response: { data: 'not found', status: 404 } });
    getUsers(logger)
      .catch(() => {
        expect(logger.error).toHaveBeenCalledWith({
          api: '/users',
          message: 'not found',
          request_time: expect.anything(),
          status: 404,
        });
      });
  });

  it('logs info about a connection error', () => {
    axios.get.mockRejectedValueOnce({ code: 'ENOTFOUND', message: 'not found' });
    getUsers(logger)
      .catch(() => {
        expect(logger.error).toHaveBeenCalledWith({
          api: '/users',
          error_code: 'ENOTFOUND',
          message: 'not found',
          request_time: expect.anything(),
          status: 666,
        });
      });
  });
});

describe('getUsersInLondon', () => {
  axios.get.mockResolvedValue({ status: 200, data: 'some data' });
  it('is a function', () => {
    expect(typeof getUsersInLondon).toEqual('function');
  });

  it('returns a promise', () => getUsersInLondon(logger)
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsersInLondon(logger)
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}city/London/users`);
      expect(response).toEqual('some data');
    }));

  it('logs info about a successful call', () => getUsersInLondon(logger)
    .then(() => {
      expect(logger.info).toHaveBeenCalledWith({ api: '/city/London/users', request_time: expect.anything(), status: 200 });
    }));

  it('logs info about a unsuccessful call', () => {
    axios.get.mockRejectedValueOnce({ response: { data: 'not found', status: 404 } });
    getUsersInLondon(logger)
      .catch(() => {
        expect(logger.error).toHaveBeenCalledWith({
          api: '/city/London/users',
          message: 'not found',
          request_time: expect.anything(),
          status: 404,
        });
      });
  });

  it('logs info about a connection error', () => {
    axios.get.mockRejectedValueOnce({ code: 'ENOTFOUND', message: 'not found' });
    getUsersInLondon(logger)
      .catch(() => {
        expect(logger.error).toHaveBeenCalledWith({
          api: '/city/London/users',
          error_code: 'ENOTFOUND',
          message: 'not found',
          request_time: expect.anything(),
          status: 666,
        });
      });
  });
});
