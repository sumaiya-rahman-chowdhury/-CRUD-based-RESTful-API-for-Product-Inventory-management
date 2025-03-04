const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
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

module.exports = router;
