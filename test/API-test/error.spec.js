const request = require('supertest');
const axios = require('axios');
const app = require('../../src/app');

jest.mock('axios');

describe('GET /users', () => {
  it('returns with status 404', () => request(app).get('/somethingWierd')
    .then((response) => {
      expect(response.status).toEqual(404);
      expect(response.body).toEqual({ message: 'Page not found' });
    }));

  it('responds with status 500 for sever error', () => {
    axios.get.mockImplementation(() => Promise.reject(new Error('an error')));
    return request(app).get('/users')
      .then((response) => {
        expect(response.status).toEqual(500);
        expect(response.body).toEqual({ error: 'an error' });
      });
  });
});
