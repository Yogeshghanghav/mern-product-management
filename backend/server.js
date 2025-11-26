const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./Models/db");
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.get("/api/v1/health", (req, res) => {
  res.json({ status: "ok", message: "API is live" });
});
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
