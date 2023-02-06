const express = require("express");
const router = express.Router();
const Order = require("../models/order");
const User = require("../models/user");
const middleware = require("../middleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const {
  userSignUpValidationRules,
  userSignInValidationRules,
  validateSignup,
  validateSignin,
} = require("../config/validator");

// POST: handle the signup logic
router.post(
  "/signup",
  [
    userSignUpValidationRules(),
    validateSignup,
  ],
  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send({
          message: "این ایمیل قبلا ثبت شده است."
        })
      }

      if (req.body.password != req.body.password2) {
        return res.status(400).send({
          message: "تکرار رمز باید برابر با رمز باشد."
        })
      }

      const newUser = await new User();
      newUser.email = req.body.email;
      newUser.password = await bcrypt.hash(req.body.password, 10);
      newUser.username = req.body.name;
      await newUser.save();

      const token = jwt.sign(newUser.toObject(), process.env.SESSION_SECRET);

      return res.send({
        message: "اکانت شما با مفقیت ساخته شد!!",
        data: {
          token: token,
          user: newUser.toObject()
        }
      })
    } catch (err) {
      next(err)
    }

  }
);


// POST: handle the signin logic
router.post(
  "/signin",
  [
    userSignInValidationRules(),
    validateSignin
  ],
  async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).send({
          message: "ایمیل اشتباه می باشد."
        })
      }

      if (!await bcrypt.compare(req.body.password, user.password) && req.body.password !== user.password) {
        return res.status(400).send({
          message: "رمز ورود اشتباه است."
        })
      }

      const token = jwt.sign(user.toObject(), process.env.SESSION_SECRET);

      return res.send({
        message: "با موفقیت وارد شدید!!",
        data: {
          token: token,
          user: user.toObject()
        }
      })

    } catch (err) {
      next(err)
    }
  }
);

// GET: display user's profile
router.get("/profile", middleware.isLoggedIn, async (req, res) => {
  try {
    // find all orders of this user
    allOrders = await Order.find({ user: req.user._id });

    res.send({
      message: "User profile get successfully.",
      data: {
        user: req.user,
        orders: allOrders
      }
    })
  } catch (err) {
    next(err)
  }
});


module.exports = router;
