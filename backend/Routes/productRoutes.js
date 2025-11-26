const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../Controller/productController");
const { requireLogin, requireAdmin } = require("../Middlewares/authGuard");
router.get("/", requireLogin, getAllProducts);
router.get("/:id", requireLogin, getSingleProduct);
router.post("/", requireLogin, requireAdmin, createProduct);
router.put("/:id", requireLogin, requireAdmin, updateProduct);
router.delete("/:id", requireLogin, requireAdmin, deleteProduct);

module.exports = router;
