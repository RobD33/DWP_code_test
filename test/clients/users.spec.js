require('dotenv').config();
const axios = require('axios');
const { getUsers, getUsersInLondon } = require('../../src/clients/users');

jest.mock('axios');

const req = {
  logger: {
    info: jest.fn(),
    error: jest.fn(),
  },
  correlationId: '0987654321',
};

describe('getUsers', () => {
  axios.get.mockResolvedValue({ status: 200, data: 'some data' });
  it('is a function', () => {
    expect(typeof getUsers).toEqual('function');
  });

  it('returns a promise', () => getUsers(req)
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsers(req)
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}users`);
      expect(response).toEqual('some data');
    }));

  it('logs info about a successful call', () => getUsers(req)
    .then(() => {
      expect(req.logger.info).toHaveBeenCalledWith({
        api: '/users',
        request_time: expect.anything(),
        status: 200,
        correlationId: '0987654321',
      });
    }));

  it('logs info about a unsuccessful call', () => {
    axios.get.mockRejectedValueOnce({ response: { data: 'not found', status: 404 } });
    getUsers(req)
      .catch(() => {
        expect(req.logger.error).toHaveBeenCalledWith({
          api: '/users',
          message: 'not found',
          request_time: expect.anything(),
          status: 404,
          correlationId: '0987654321',
        });
      });
  });

  it('logs info about a connection error', () => {
    axios.get.mockRejectedValueOnce({ code: 'ENOTFOUND', message: 'not found' });
    getUsers(req)
      .catch(() => {
        expect(req.logger.error).toHaveBeenCalledWith({
          api: '/users',
          error_code: 'ENOTFOUND',
          message: 'not found',
          request_time: expect.anything(),
          status: 666,
          correlationId: '0987654321',
        });
      });
  });
});

describe('getUsersInLondon', () => {
  axios.get.mockResolvedValue({ status: 200, data: 'some data' });
  it('is a function', () => {
    expect(typeof getUsersInLondon).toEqual('function');
  });

  it('returns a promise', () => getUsersInLondon(req)
    .then((response) => {
      expect(response).toBeTruthy();
    }));

  it('sends a get request to test app users endpoint', () => getUsersInLondon(req)
    .then((response) => {
      expect(axios.get).toHaveBeenCalledWith(`${process.env.TEST_API_URL}city/London/users`);
      expect(response).toEqual('some data');
    }));

  it('logs info about a successful call', () => getUsersInLondon(req)
    .then(() => {
      expect(req.logger.info).toHaveBeenCalledWith({
        api: '/city/London/users',
        request_time: expect.anything(),
        status: 200,
        correlationId: '0987654321',
      });
    }));

  it('logs info about a unsuccessful call', () => {
    axios.get.mockRejectedValueOnce({ response: { data: 'not found', status: 404 } });
    getUsersInLondon(req)
      .catch(() => {
        expect(req.logger.error).toHaveBeenCalledWith({
          api: '/city/London/users',
          message: 'not found',
          request_time: expect.anything(),
          status: 404,
          correlationId: '0987654321',
        });
      });
  });

  it('logs info about a unsuccessful call stringifys a data object', () => {
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'not found' }, status: 404 } });
    getUsersInLondon(req)
      .catch(() => {
        expect(req.logger.error).toHaveBeenCalledWith({
          api: '/city/London/users',
          message: '{"message":"not found"}',
          request_time: expect.anything(),
          status: 404,
          correlationId: '0987654321',
        });
      });
  });

  it('logs info about a connection error', () => {
    axios.get.mockRejectedValueOnce({ code: 'ENOTFOUND', message: 'not found' });
    getUsersInLondon(req)
      .catch(() => {
        expect(req.logger.error).toHaveBeenCalledWith({
          api: '/city/London/users',
          error_code: 'ENOTFOUND',
          message: 'not found',
          request_time: expect.anything(),
          status: 666,
          correlationId: '0987654321',
        });
      });
  });
});
