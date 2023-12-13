const ProductModel = require("../models/product.model");

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    // Extracting product information from the request body
    const { productname, category, productdetails, price, rating } = req.body;

    // Creating a new product using the ProductModel
    const insertedProduct = await ProductModel.create({
      productname,
      category,
      productdetails,
      price,
      rating,
    });

    // Returning success message and inserted product details
    res.status(200).json({
      message: "Product inserted successfully",
      insertedProduct,
    });
  } catch (error) {
    // Logging the error and returning an error response
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to update product details
const updateProduct = async (req, res) => {
  try {
    // Extracting product ID from request parameters
    const { id } = req.params;

    // Extracting updated product details from the request body
    const { productdetails, price } = req.body;

    // Updating the product details based on the product ID
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      { productdetails, price },
      { new: true }
    );

    // Returning success message and updated product details
    res.status(201).json({
      message: "Product data updated",
      updatedProduct,
    });
  } catch (error) {
    // Logging the error and returning an error response
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to filter products based on price range
const filterProduct = async (req, res) => {
  try {
    // Extracting minimum and maximum prices from query parameters
    const { minprice, maxprice } = req.query;

    // Filtering products based on the specified price range
    const filteredProduct = await ProductModel.find({
      price: { $gte: minprice, $lte: maxprice },
    });

    // Returning the filtered products
    res.status(200).json({
      filteredProduct,
    });
  } catch (error) {
    // Logging the error and returning an error response
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to delete a product
const deleteproduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { productId } = req.params;

    // Attempt to delete the product by productId
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    // Check if the product with the specified productId exists
    if (!deletedProduct) {
      return res.status(404).json({
        message: `Product with id ${productId} not found`,
      });
    }

    // Respond with a success message and the details of the deleted product
    return res.json({
      message: `Product with id ${productId} has been deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    // Handle unexpected errors, log them, and provide a generic error message
    console.error("Error during product deletion:", error);
    return res.status(404).json({
      message: error.message,
    });
  }
};

// Exporting functions for use in the routes
module.exports = {
  addProduct,
  updateProduct,
  filterProduct,
  deleteproduct,
};
