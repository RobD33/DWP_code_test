require('dotenv').config();
const axios = require('axios');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: 'some data' })),
}));

describe('getUsers', () => {
  it('is a function', () => {
    expect(typeof getUsers).toEqual('function');
  });

  it('returns a promise', () => getUsers()
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsers()
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}users`);
      expect(response).toEqual('some data');
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
