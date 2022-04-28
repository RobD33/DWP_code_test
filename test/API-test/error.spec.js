const request = require('supertest');
const app = require('../../src/app');

describe('GET /users', () => {
  it('returns with status 404', () => request(app).get('/somethingWierd')
    .then((response) => {
      expect(response.status).toEqual(404);
      expect(response.body).toEqual({ message: 'Page not found' });
    }));
});
