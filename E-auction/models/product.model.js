const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for product details
const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    rating: {
      type: Number,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    // Enable timestamps to track creation and update times
    timestamps: true,
  }
);

// Create a mongoose model based on the schema
const ProductModel = mongoose.model("products", ProductSchema);

// Export the model for use in other parts of the application
module.exports = ProductModel;
