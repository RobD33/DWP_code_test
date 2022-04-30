require('dotenv').config();
const axios = require('axios');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ status: 200, data: 'some data' })),
}));

const logger = {
  info: jest.fn(),
};

describe('getUsers', () => {
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

  it('logs info about the call', () => getUsers(logger)
    .then(() => {
      expect(logger.info).toHaveBeenCalledWith({ api: '/users', request_time: 0, status: 200 });
    }));
});

describe('getUsersInLondon', () => {
  it('is a function', () => {
    expect(typeof getUsersInLondon).toEqual('function');
  });

  it('returns a promise', () => getUsersInLondon()
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsersInLondon()
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}city/London/users`);
      expect(response).toEqual('some data');
    }));
});
