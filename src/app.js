const express = require('express');
const logger = require('./middleware/logger');
const router = require('./routes');

const app = express();

app.use(logger);
app.use(router);

module.exports = app;
