const haversine = require('haversine-distance');

module.exports = (users, coordinates, distance) => users
  .filter((user) => (haversine(user, coordinates) < distance));
