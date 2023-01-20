let middlewareObject = {};
const jwt = require("jsonwebtoken");

middlewareObject.isLoggedIn = (req, res, next) => {

  if (!req.header('authorization')) {
    return res.status(400).send({
      message: "User should login."
    })
  }

  const token = req.header('authorization').split(' ');

  const user = jwt.decode(token[1]);

  if (!user) {
    return res.status(400).send({
      message: "User should login."
    })
  }

  req.user = user

  next()
};

module.exports = middlewareObject;
