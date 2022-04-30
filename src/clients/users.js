require('dotenv').config();
const axios = require('axios');

const { TEST_API_URL } = process.env;

const callAPI = (endpoint, req) => {
  const startTime = Date.now();
  const url = `${TEST_API_URL}${endpoint}`;
  return axios.get(url)
    .then((res) => {
      req.logger.info({
        api: `/${endpoint}`,
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
          api: `/${endpoint}`,
          status: err.response.status,
          request_time, // eslint-disable-line camelcase
          message: (typeof data === 'string') ? data : JSON.stringify(data),
          correlationId: req.correlationId,
        });
      } else {
        req.logger.error({
          api: `/${endpoint}`,
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

const getUsers = (req) => callAPI('users', req);
const getUsersInLondon = (req) => callAPI('city/London/users', req);

module.exports = { getUsers, getUsersInLondon };
