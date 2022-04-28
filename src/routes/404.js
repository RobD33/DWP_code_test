module.exports = (req, res, next) => { // eslint-disable-line no-unused-vars
  res.status(404).send({ message: 'Page not found' });
};
