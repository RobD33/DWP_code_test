const winston = require('winston');

const logger = winston.createLogger();

module.exports = (req, res, next) => {
  req.logger = logger;
  next();
};
