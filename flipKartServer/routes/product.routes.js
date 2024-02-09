const express = require("express");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  filterProduct,
  deleteProduct,
  searchProduct,
  getProductById,
} = require("../controllers/product.controllers");
const jwtHandler = require("../utils/jwthandler");

// Creating a custom route for product-related endpoints
const productRoute = express.Router();

// Route to get All Porducts
productRoute.get("/getAllProducts", jwtHandler, getAllProducts);

// Route to get a specific product by its Id
productRoute.get("/getProductById/:id", jwtHandler, getProductById);

// Route to add a new product
productRoute.post("/addProduct", jwtHandler, addProduct);

// Route to update an existing product
productRoute.post("/updateProduct", jwtHandler, updateProduct);

// Route to filter and retrieve products
productRoute.post("/filterProduct", jwtHandler, filterProduct);

// Route to search for products
productRoute.post("/search", jwtHandler, searchProduct);

// Route to delete a specific product by its productId
productRoute.post("/deleteproduct/:productId", jwtHandler, deleteProduct);

// Exporting the productRoute for use in the main app
module.exports = productRoute;
