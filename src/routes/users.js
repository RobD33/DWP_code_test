const usersRouter = require('express').Router();

usersRouter.route('/')
  .get((req, res) => res.send({}));

module.exports = usersRouter;
