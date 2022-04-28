const winston = require('winston');

const options = {
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
};

const logger = winston.createLogger(options);

module.exports = (req, res, next) => {
  req.logger = logger;
  next();
};

module.exports.options = options;
