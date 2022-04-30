const { getUsers, getUsersInLondon } = require('../clients/users');
const filterUsers = require('../helpers/filterUsers');
const uniqueUsers = require('../helpers/uniqueUsers');

const london = { latitude: 51.5074, longitude: 0.1272 }; // source: https://www.google.com/search?q=centre+london+coordinates
const distance = 80467.2; // 50 miles in meters

module.exports = (req, res, next) => Promise.all([
  getUsers(req),
  getUsersInLondon(req),
])
  .then(([users, usersInLondon]) => {
    const filteredUsers = filterUsers(users, london, distance);
    const uniqueUsersArray = uniqueUsers([...filteredUsers, ...usersInLondon]);
    res.send({ data: uniqueUsersArray });
  })
  .catch(next);
