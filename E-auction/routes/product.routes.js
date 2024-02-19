const express = require("express");
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  placeBid,
} = require("../controllers/product.controllers");
const jwtHandler = require("../utils/jwthandler");
const multerMiddleware = require("../utils/multerMiddleware");
// Creating a custom route for product-related endpoints
const productRoute = express.Router();

// Route to get All Porducts
productRoute.get("/getAllProducts", jwtHandler, getAllProducts);

// Route to get a specific product by its Id
productRoute.get("/getProductById/:id", jwtHandler, getProductById);

// Route to add a new product
productRoute.post("/addProduct", jwtHandler, multerMiddleware, addProduct);

// Route to update an existing product
productRoute.post(
  "/updateProduct",
  jwtHandler,
  multerMiddleware,
  updateProduct
);

// Route to delete a specific product by its productId
productRoute.post("/deleteproduct/:productId", jwtHandler, deleteProduct);

// Route to place a bid for a particular product by it's productId
productRoute.post("/placeBid/:productId", jwtHandler, placeBid);

// Exporting the productRoute for use in the main app
module.exports = productRoute;
