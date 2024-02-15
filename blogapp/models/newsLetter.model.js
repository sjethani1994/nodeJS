const mongoose = require("mongoose");

// Define schema for subscriber
const newsLetterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures uniqueness of email
    trim: true, // Removes leading/trailing whitespace
  },
  subscribedAt: {
    type: Date,
    default: Date.now, // Sets default value to current date and time
  },
});

// Create model from schema
const newsLetterModel = mongoose.model("newsLetter", newsLetterSchema);

module.exports = newsLetterModel;
