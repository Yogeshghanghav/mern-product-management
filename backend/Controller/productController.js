const ProductItem = require("../Models/product");

const createProduct = async (req, res) => {
  try {
    const { title, amount, category, isAvailable } = req.body;

    if (!title || !amount || !category) {
      return res
        .status(400)
        .json({ msg: "All Info Fills , is compulsory.." });
    }

    const product = new ProductItem({
      title,
      amount,
      category,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      createdBy: req.currentUser._id
    });

    await product.save();

    res.status(201).json({
      msg: "Product created",
      data: product
    });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ msg: "Error while creating product" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductItem.find().sort({ createdAt: -1 });
    res.json({ count: products.length, data: products });
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ msg: "Error while fetching products" });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const prod = await ProductItem.findById(req.params.id);
    if (!prod) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json({ data: prod });
  } catch (err) {
    console.error("Get product error:", err);
    res.status(500).json({ msg: "Error while fetching product" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { title, amount, category, isAvailable } = req.body;

    const updated = await ProductItem.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, isAvailable },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product updated", data: updated });
  } catch (err) {
    console.error("Update product error:", err);
    res.status(500).json({ msg: "Error while updating product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await ProductItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ msg: "Error while deleting product" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
