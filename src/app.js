const express = require('express');
const logger = require('./middleware/logger');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(logger);
app.use(router);
app.use(errorHandler);

module.exports = app;
