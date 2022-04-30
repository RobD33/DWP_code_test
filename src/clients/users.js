require('dotenv').config();
const axios = require('axios');

const { TEST_API_URL } = process.env;

const getUsers = (logger) => {
  const startTime = Date.now();
  const url = `${TEST_API_URL}users`;
  return axios.get(url)
    .then((res) => {
      logger.info({
        api: '/users',
        status: res.status,
        request_time: (Date.now() - startTime) / 1000,
      });
      return res.data;
    })
    .catch((err) => {
      const request_time = (Date.now() - startTime) / 1000; // eslint-disable-line camelcase
      if (err.response) {
        const { data } = err.response;
        logger.error({
          api: '/users',
          status: err.response.status,
          request_time, // eslint-disable-line camelcase
          message: (typeof data === 'string') ? data : JSON.stringify(data),
        });
      } else {
        logger.error({
          api: '/users',
          status: 666,
          request_time, // eslint-disable-line camelcase
          error_code: err.code,
          message: err.message,
        });
      }
      throw err;
    });
};

const getUsersInLondon = (logger) => {
  const startTime = Date.now();
  const url = `${TEST_API_URL}city/London/users`;
  return axios.get(url)
    .then((res) => {
      logger.info({
        api: '/city/London/users',
        status: res.status,
        request_time: (Date.now() - startTime) / 1000,
      });
      return res.data;
    })
    .catch((err) => {
      const request_time = (Date.now() - startTime) / 1000; // eslint-disable-line camelcase
      if (err.response) {
        const { data } = err.response;
        logger.error({
          api: '/city/London/users',
          status: err.response.status,
          request_time, // eslint-disable-line camelcase
          message: (typeof data === 'string') ? data : JSON.stringify(data),
        });
      } else {
        logger.error({
          api: '/city/London/users',
          status: 666,
          request_time, // eslint-disable-line camelcase
          error_code: err.code,
          message: err.message,
        });
      }
      throw err;
    });
};

module.exports = { getUsers, getUsersInLondon };
