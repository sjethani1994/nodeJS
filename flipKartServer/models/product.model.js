const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a schema for product details
const ProductSchema = new Schema({
    // Name of the product
    productname: {
        type: String,
        required: true,
    },
    // Category to which the product belongs
    category: {
        type: String,
        required: true,
    },
    // Details/description of the product
    productdetails: {
        type: String,
        required: true,
    },
    // Price of the product
    price: {
        type: String,
        required: true,
    },
    // Quantity of the product available in stock with a default value of 10
    productQuantity: {
        type: Number,
        required: true,
        default: 10,
    },
    // URL or path to the product image
    productImage: {
        type: String,
    },
    // Rating of the product
    rating: {
        type: String,
    },
}, {
    // Enable timestamps to track creation and update times
    timestamps: true,
});

// Create a mongoose model based on the schema
const ProductModel = mongoose.model('FlipkartProducts', ProductSchema);

// Export the model for use in other parts of the application
module.exports = ProductModel;
