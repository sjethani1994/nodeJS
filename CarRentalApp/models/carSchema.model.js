const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for car details
const CarSchema = new Schema({
  // Model name of the car
  model: {
    type: String,
    required: true,
    trim: true,
  },
  // Make or brand of the car
  make: {
    type: String,
    required: true,
    trim: true,
  },
  // Manufacturing year of the car
  year: {
    type: Number,
    required: true,
  },
  // Daily rental price for the car
  price: {
    type: Number,
    required: true,
  },
  // Boolean flag indicating whether the car is available for rent
  available: {
    type: Boolean,
    required: true,
    default: true, // You can set a default value if needed
  },
  // Array of additional features or amenities
  features: {
    type: [String],
    default: [], // You can set a default value if needed
  },
  // URL or file path to the car image
  image: {
    type: String,
    default: null, // You can set a default value if needed
  },
});

// Create a mongoose model based on the schema
const CarModel = mongoose.model("carListings", CarSchema);

// Export the model for use in other parts of the application
module.exports = CarModel;
