let middlewareObject = {};
const jwt = require("jsonwebtoken");
const User = require("../models/user");

middlewareObject.isLoggedIn = async (req, res, next) => {

  if (!req.header('authorization')) {
    return res.status(400).send({
      message: "User should login."
    })
  }

  const token = req.header('authorization').split(' ');

  const decrypted = jwt.decode(token[1]);

  const user = await User.findById(decrypted._id);

  if (!user) {
    return res.status(400).send({
      message: "User should login."
    })
  }

  req.user = user

  next()
};

module.exports = middlewareObject;
