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
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  req.logger = logger;
  next();
};

module.exports.options = options;
