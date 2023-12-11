const express = require("express");
const {
  addProduct,
  updateProduct,
  filterProduct,
  deleteproduct,
} = require("../controllers/product.controllers");
const jwtHandler = require("../utils/jwthandler");

// Creating a custom route for product-related endpoints
const productRoute = express.Router();

// Route to add a new product
productRoute.post("/addProduct", jwtHandler, addProduct);

// Route to update an existing product
productRoute.post("/updateProduct", jwtHandler, updateProduct);

// Route to filter and retrieve products
productRoute.post("/filterProduct", jwtHandler, filterProduct);

// Route to delete a specific product by its productId
productRoute.post("/deleteproduct/:productId", jwtHandler, deleteproduct);

// Exporting the productRoute for use in the main app
module.exports = productRoute;
