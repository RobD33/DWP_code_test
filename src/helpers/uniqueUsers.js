module.exports = (users) => users.filter((user, index, self) => index === self
  .findIndex(({ id }) => id === user.id));
