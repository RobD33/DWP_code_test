module.exports = (req, res, next) => {
  req.logger = {};
  next();
};
