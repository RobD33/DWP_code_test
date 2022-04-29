const usersRouter = require('express').Router();
const usersController = require('../controllers/users');

usersRouter.route('/')
  .get(usersController);

module.exports = usersRouter;
