const jwt = require("jsonwebtoken");
const UserAccount = require("../Models/user");

const requireLogin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ msg: "Auth token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserAccount.findById(decoded.uid).select(
      "-hashedPassword"
    );

    if (!user) {
      return res.status(401).json({ msg: "User not found for this token" });
    }

    req.currentUser = user; 
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.currentUser || req.currentUser.role !== "admin") {
    return res
      .status(403)
      .json({ msg: "Only For Admin" });
  }
  next();
};

module.exports = { requireLogin, requireAdmin };
