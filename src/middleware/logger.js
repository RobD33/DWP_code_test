const winston = require('winston');

const options = {};

const logger = winston.createLogger(options);

module.exports = (req, res, next) => {
  req.logger = logger;
  next();
};

module.exports.options = options;
