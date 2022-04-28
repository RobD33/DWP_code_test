const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const path = require('path');
const notFound = require('./404');

const filePath = path.join(__dirname, '../../docs/swagger.yaml');
const swaggerDocument = yamljs.load(filePath);

router.use('/users', (req, res) => res.send({}));
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/*', notFound);

module.exports = router;
