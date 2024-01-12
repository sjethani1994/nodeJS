// Importing mongoose and extracting Schema from it
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Creating a schema for the reviews
const reviewSchema = new Schema({
  // Message content of the review
  reviewMsg: {
    type: String,
    required: true,
  },
  // Reference to the user who wrote the review
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userDetails", // Referencing the "userDetails" model
    required: true,
  },
  // Reference to the car associated with the review
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carListings", // Referencing the "carListings" model
    required: true,
  },
});

// Creating a model based on the review schema
const reviewModel = mongoose.model("reviews", reviewSchema);

// Exporting the review model for use in other parts of the application
module.exports = reviewModel;
