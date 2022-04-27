const request = require('supertest');
const app = require('../../src/app');

describe('GET /users', () => {
  it('returns with status 200', () => request(app).get('/users')
    .then((response) => {
      expect(response.status).toEqual(200);
    }));
});
