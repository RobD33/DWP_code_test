require('dotenv').config();
const axios = require('axios');

const { TEST_API_URL } = process.env;

const getUsers = (req) => {
  const startTime = Date.now();
  const url = `${TEST_API_URL}users`;
  return axios.get(url)
    .then((res) => {
      req.logger.info({
        api: '/users',
        status: res.status,
        request_time: (Date.now() - startTime) / 1000,
        correlationId: req.correlationId,
      });
      return res.data;
    })
    .catch((err) => {
      const request_time = (Date.now() - startTime) / 1000; // eslint-disable-line camelcase
      if (err.response) {
        const { data } = err.response;
        req.logger.error({
          api: '/users',
          status: err.response.status,
          request_time, // eslint-disable-line camelcase
          message: (typeof data === 'string') ? data : JSON.stringify(data),
          correlationId: req.correlationId,
        });
      } else {
        req.logger.error({
          api: '/users',
          status: 666,
          request_time, // eslint-disable-line camelcase
          error_code: err.code,
          message: err.message,
          correlationId: req.correlationId,
        });
      }
      throw err;
    });
};

const getUsersInLondon = (req) => {
  const startTime = Date.now();
  const url = `${TEST_API_URL}city/London/users`;
  return axios.get(url)
    .then((res) => {
      req.logger.info({
        api: '/city/London/users',
        status: res.status,
        request_time: (Date.now() - startTime) / 1000,
        correlationId: req.correlationId,
      });
      return res.data;
    })
    .catch((err) => {
      const request_time = (Date.now() - startTime) / 1000; // eslint-disable-line camelcase
      if (err.response) {
        const { data } = err.response;
        req.logger.error({
          api: '/city/London/users',
          status: err.response.status,
          request_time, // eslint-disable-line camelcase
          message: (typeof data === 'string') ? data : JSON.stringify(data),
          correlationId: req.correlationId,
        });
      } else {
        req.logger.error({
          api: '/city/London/users',
          status: 666,
          request_time, // eslint-disable-line camelcase
          error_code: err.code,
          message: err.message,
          correlationId: req.correlationId,
        });
      }
      throw err;
    });
};

module.exports = { getUsers, getUsersInLondon };
