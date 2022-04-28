module.exports = (error, req, res, next) => { // eslint-disable-line no-unused-vars
  req.logger.error('error', { message: error.message });
};
