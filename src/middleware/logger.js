const winston = require('winston');
const { v1: uuid } = require('uuid');

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
  const correlationId = req.get('correlation-id') || uuid();
  req.correlationId = correlationId;
  req.logger = logger;
  res.setHeader('correlation-id', correlationId);
  next();
};

module.exports.options = options;
