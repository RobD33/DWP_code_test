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

  it('returns a correlation-id', () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    return request(app)
      .get('/users')
      .set('correlation-id', 'a correlation id')
      .then((response) => {
        expect(response.header['correlation-id']).toEqual('a correlation id');
      });
  });

  it('returns a unique list of users living in or near london', () => {
    const userOne = {
      id: 1,
      latitude: 51.4,
      longitude: 0.1,
    };
    const userTwo = {
      id: 2,
      latitude: 100,
      longitude: 100,
    };
    const userThree = {
      id: 3,
      latitude: 123,
      longitude: -55,
    };
    const userFour = {
      id: 4,
      latitude: 51.9,
      longitude: -0.4765,
    };
    const users = [userOne, userTwo, userThree, userFour];
    const usersInLondon = [userThree, userFour];

    axios.get.mockImplementation((url) => {
      if (url.includes('city/London/users')) {
        return Promise.resolve({ data: usersInLondon });
      }
      return Promise.resolve({ data: users });
    });

    return request(app)
      .get('/users')
      .set('correlation-id', 'a correlation id')
      .then((response) => {
        expect(response.body).toEqual({ data: [userOne, userThree, userFour] });
      });
  });
});
