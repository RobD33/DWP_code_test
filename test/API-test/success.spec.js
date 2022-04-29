const request = require('supertest');
const axios = require('axios');
const app = require('../../src/app');

jest.mock('axios');

describe('GET /users', () => {
  it('returns with status 200', () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    return request(app).get('/users')
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it('returns a correlation-id', () => request(app)
    .get('/users')
    .set('correlation-id', 'a correlation id')
    .then((response) => {
      expect(response.header['correlation-id']).toEqual('a correlation id');
    }));
});
