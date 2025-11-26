const router = require("express").Router();
const {
  validateRegister,
  validateLogin,
} = require("../Middlewares/AuthValidation");
const { registerUser, loginUser } = require("../Controller/AuthController");

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
