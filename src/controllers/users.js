module.exports = (req, res, next) => {
  try {
    res.send({});
  } catch (err) {
    next();
  }
};
