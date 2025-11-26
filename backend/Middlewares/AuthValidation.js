const Joi = require("joi");

const validateRegister = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    emailId: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().valid("user", "admin").optional(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ msg: "Invalid User..", details: error.details });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    emailId: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ msg: "Invalid Detail For Login", details: error.details });
  }
  next();
};

module.exports = { validateRegister, validateLogin };
