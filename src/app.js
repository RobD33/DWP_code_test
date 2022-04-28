const express = require('express');
const logger = require('./middleware/logger');

const app = express();

app.use(logger);
app.use('/users', (req, res) => res.send({}));

module.exports = app;
