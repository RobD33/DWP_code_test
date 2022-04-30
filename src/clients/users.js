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
    });
};

const getUsersInLondon = () => {
  const url = `${TEST_API_URL}city/London/users`;
  return axios.get(url)
    .then((res) => res.data);
};

module.exports = { getUsers, getUsersInLondon };
