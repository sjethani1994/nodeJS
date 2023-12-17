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
  score: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
});

// Create a mongoose model based on the schema
const UserModel = mongoose.model("userDetails", UserdetailSchema);

// Export the model for use in other parts of the application
module.exports = UserModel;
