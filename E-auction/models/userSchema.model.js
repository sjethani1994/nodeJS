const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for user details
const UserdetailSchema = new Schema({
  // Username of the user
  username: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    maxlength: 10,
  },
  // Email of the user
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // Password of the user with custom validation
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length > 7;
      },
      message: "Password should be greater than 7 characters",
    },
  },
  // First name of the user
  firstName: {
    type: String,
    trim: true,
  },
  // Last name of the user
  lastName: {
    type: String,
    trim: true,
  },
  // Address of the user
  address: {
    type: String,
    trim: true,
  },
  // Company name of the user
  company: {
    type: String,
    trim: true,
  },
  // Short bio of the user
  bio: {
    type: String,
    trim: true,
  },
  // Date of birth of the user
  birthDate: {
    type: Date, // Consider using Date type for dates
    trim: true,
  },
  // Country of the user
  country: {
    type: String,
    trim: true,
  },
  // Phone number of the user
  phone: {
    type: Number,
    trim: true,
  },
  // Personal website of the user
  website: {
    type: String,
    trim: true,
  },
  // Google account link of the user
  google: {
    type: String,
    trim: true,
  },
  // Instagram account link of the user
  instagram: {
    type: String,
    trim: true,
  },
  // LinkedIn account link of the user
  linkedIn: {
    type: String,
    trim: true,
  },
  // URL of the user's avatar image
  avatar: {
    type: String,
  },
});

// Create a mongoose model based on the schema
const UserModel = mongoose.model("users", UserdetailSchema);

// Export the model for use in other parts of the application
module.exports = UserModel;
