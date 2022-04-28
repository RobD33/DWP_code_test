module.exports = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  req.logger.error('error', { message: error.message });
  res.status(500).send({ error: error.message });
};
