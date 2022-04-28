const request = require('supertest');
const app = require('../../src/app');

describe('GET /users', () => {
  it('returns with status 200', () => request(app).get('/users')
    .then((response) => {
      expect(response.status).toEqual(200);
    }));

  it('returns a correlation-id', () => request(app)
  .get('/users')
  .set('correlation-id', 'a correlation id')
  .then((response) => {
    expect(response.header['correlation-id']).toEqual('a correlation id');
  }));
});
