const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const path = require('path');
const notFound = require('./404');
const usersRouter = require('./users');

const filePath = path.join(__dirname, '../../docs/swagger.yaml');
const swaggerDocument = yamljs.load(filePath);

router.use('/users', usersRouter);
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/*', notFound);

module.exports = router;
