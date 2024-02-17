const ProductModel = require("../models/product.model");
// Periodically send product bidder data through socket
const startProductSocket = require("../utils/productSocket");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find();
    res.status(200).json({
      message: "All products retrieved successfully",
      products: allProducts,
      totalProducts: allProducts.length,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `Product with id ${id} retrieved successfully`,
      product: product,
    });
  } catch (error) {
    console.error("Error retrieving product by id:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subCategory,
      image,
      seller,
      price,
      endDate,
    } = req.body;
    const newProduct = await ProductModel.create({
      title,
      description,
      category,
      subCategory,
      image,
      seller,
      price,
      endDate,
    });
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, subCategory, image, price } =
      req.body;
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        subCategory,
        image,
        price,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `Product with id ${id} updated successfully`,
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await ProductModel.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({
        message: `Product with id ${id} not found`,
      });
    }
    res.status(200).json({
      message: `Product with id ${id} deleted successfully`,
      deletedProduct: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const placeBid = async (req, res) => {
  try {
    const { productId } = req.params;
    const { amount } = req.body;

    // Check if the product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: `Product with id ${productId} not found`,
      });
    }

    // Check if the bid amount is valid
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Invalid bid amount",
      });
    }

    // Check if the user already placed a bid
    const existingBid = product.bidders.find(
      (bidder) => String(bidder.user) === String(req.userId)
    );
    if (existingBid) {
      // Update the existing bid amount
      existingBid.bidAmount = amount;
    } else {
      // Add user detail and bid amount to the bidders array
      product.bidders.push({
        user: req.userId, // Assuming the user's ID is stored in req.userId
        username: req.username,
        bidAmount: amount,
      });
    }

    // Update the product with the new bid amount
    product.currentBid = amount;
    await product.save();

    const io = req.app.locals.io;
    // Call the socket function with the io object and the product object
    await startProductSocket(io, product);

    res.status(200).json({
      message: "Bid placed successfully",
      product: product,
    });
  } catch (error) {
    console.error("Error placing bid:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  placeBid,
};
