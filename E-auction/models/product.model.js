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
    avatar: { type: String },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    highestBidder: {
      type: String,
      default: null,
    },
    bidders: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        username: {
          type: String,
        },
        bidAmount: {
          type: Number,
          required: true,
        },
      },
    ],
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
