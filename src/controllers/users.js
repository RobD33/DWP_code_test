const { getUsers, getUsersInLondon } = require('../clients/users');
const filterUsers = require('../helpers/filterUsers');
const uniqueUsers = require('../helpers/uniqueUsers');

module.exports = (req, res, next) => Promise.all([getUsers(), getUsersInLondon()])
  .then(([users, usersInLondon]) => {
    const filteredUsers = filterUsers(users);
    const uniqueUsersArray = uniqueUsers([...filteredUsers, ...usersInLondon]);
    res.send({ data: uniqueUsersArray });
  })
  .catch(next);
