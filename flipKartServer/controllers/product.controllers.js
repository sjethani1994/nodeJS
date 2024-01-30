// Import the ProductModel from the product.model file
const ProductModel = require("../models/product.model");

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const allProducts = await ProductModel.find();

    // Respond with a success message, all products, and the total number of products
    res.status(200).json({
      message: "All documents",
      allProducts,
      totalProducts: allProducts.length,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to add a new product
const addProduct = async (req, res) => {
  try {
    // Extract product information from the request body
    const { title, price, description, category, subCategory, image, rating } =
      req.body;

    // Create a new product using the ProductModel
    const insertedProduct = await ProductModel.create({
      title,
      description,
      price,
      category,
      subCategory,
      image,
      rating,
    });

    // Respond with a success message and the details of the inserted product
    res.status(200).json({
      message: "Product inserted successfully",
      insertedProduct,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to update product details
const updateProduct = async (req, res) => {
  try {
    // Extract product ID from request parameters
    const { id } = req.params;

    // Extract updated product details from the request body
    const { title, price } = req.body;

    // Update the product details based on the product ID
    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: id },
      { title, price },
      { new: true }
    );

    // Respond with a success message and the updated product details
    res.status(201).json({
      message: "Product data updated",
      updatedProduct,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to filter products
const filterProduct = async (req, res) => {
  try {
    // Extract the category from query parameters
    const { category, subCategory } = req.query;

    // Construct the query with AND condition
    let query = {};

    if (category && subCategory) {
      // If both category and subCategory are provided, use $and
      query = { $and: [{ category }, { subCategory }] };
    } else {
      // If either category or subCategory is provided, use $or
      query = { $or: [{ category }, { subCategory }] };
    }

    const filteredProducts = await ProductModel.find(query);

    // Respond with the filtered products
    res.status(200).json({
      filteredProducts,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to filter products
const searchProduct = async (req, res) => {
  try {
    // Extract the category from query parameters
    const { searchTerm } = req.query;

    // Construct the query to search for products
    const regex = new RegExp(searchTerm, "i"); // 'i' for case-insensitive
    const searchQuery = {
      $or: [{ title: regex }, { category: regex }, { subcategory: regex }],
    };

    // Search for products based on the constructed query
    const filteredProducts = await ProductModel.find(searchQuery);

    // Respond with the filtered products
    res.status(200).json({
      filteredProducts,
    });
  } catch (error) {
    // Handle errors and respond with an error message
    console.log(error.message);
    res.status(404).json({
      message: error.message,
    });
  }
};

// Function to delete a product
const deleteProduct = async (req, res) => {
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

// Export functions for use in the routes
module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  filterProduct,
  searchProduct,
  deleteProduct,
};
