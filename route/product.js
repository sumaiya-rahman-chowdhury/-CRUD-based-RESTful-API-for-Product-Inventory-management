const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    let sort = {};
    if (req.query.sortBy) {
      const order = req.query.order === "desc" ? -1 : 1;
      sort[req.query.sortBy] = order;
    }
    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
      filter,
      sort,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/add-product", async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    if (!name || !price || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      description,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving product", error });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        stock,
        description,
      },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
