require('dotenv').config();
const axios = require('axios');

const { TEST_API_URL } = process.env;

const getUsers = () => {
  const url = `${TEST_API_URL}/users`;
  return axios.get(url)
    .then((res) => res.data);
};

module.exports = { getUsers };
