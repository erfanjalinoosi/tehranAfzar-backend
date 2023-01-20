const { check, validationResult } = require("express-validator");

const userSignUpValidationRules = () => {
  return [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Invalid email").not().isEmpty().isEmail(),
    check("password", "Please enter a password with 4 or more characters")
      .not()
      .isEmpty()
      .isLength({ min: 4 }),
  ];
};

const userSignInValidationRules = () => {
  return [
    check("email", "Invalid email").not().isEmpty().isEmail(),
    check("password", "Invalid password").not().isEmpty().isLength({ min: 4 }),
  ];
};

const userContactUsValidationRules = () => {
  return [
    check("name", "Please enter a name").not().isEmpty(),
    check("email", "Please enter a valid email address")
      .not()
      .isEmpty()
      .isEmail(),
    check("message", "Please enter a message with at least 10 words")
      .not()
      .isEmpty()
      .isLength({ min: 10 }),
  ];
};

const validateSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });


    return res.status(400).send({
      message: "Signup failed.",
      data: {
        errors: messages
      }
    })
  }
  next();
};

const validateSignin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });
    
    return res.status(400).send({
      message: "Signin failed.",
      data: {
        errors: messages
      }
    })
  }
  next();
};

const validateContactUs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var messages = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });

    return res.status(400).send({
      message: "Contact us failed.",
      data: {
        errors: messages
      }
    })
  }
  next();
};

module.exports = {
  userSignUpValidationRules,
  userSignInValidationRules,
  userContactUsValidationRules,
  validateSignup,
  validateSignin,
  validateContactUs,
};
