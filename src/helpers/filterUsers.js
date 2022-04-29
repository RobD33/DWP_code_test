const haversine = require('haversine-distance');
module.exports = (users, coordinates, distance) => {
  return users.filter(user => {
    return (haversine(user, coordinates) < distance)
  });
};
