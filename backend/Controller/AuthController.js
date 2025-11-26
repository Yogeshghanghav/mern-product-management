const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserAccount = require("../Models/user");
const registerUser = async (req, res) => {
  try {
    const { fullName, emailId, password, role } = req.body;

    const already = await UserAccount.findOne({ emailId });
    if (already) {
      return res
        .status(400)
        .json({ msg: "This email is already registered with us." });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new UserAccount({
      fullName,
      emailId,
      hashedPassword,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      msg: "Registration successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        emailId: user.emailId,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Something went wrong while creating user" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await UserAccount.findOne({ emailId });
    if (!user) {
      return res.status(400).json({ msg: "Invalid login credentials" });
    }

    const isCorrect = await bcrypt.compare(password, user.hashedPassword);
    if (!isCorrect) {
      return res.status(400).json({ msg: "Invalid login credentials" });
    }

    const token = jwt.sign(
      { uid: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login success",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        emailId: user.emailId,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error during login" });
  }
};

module.exports = { registerUser, loginUser };
