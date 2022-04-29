const { getUsers, getUsersInLondon } = require('../clients/users');

module.exports = (req, res, next) => {
  return Promise.all([getUsers(), getUsersInLondon()])
    .then(() => res.send({}))
    .catch(next)
};
