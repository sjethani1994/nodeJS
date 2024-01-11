const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for user details
const UserDetailSchema = new Schema({
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
    // Add a comment explaining the constraints
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
    default: 0,
  },
  session: {
    sessionId: String,
    createdAt: { type: Date, default: Date.now },
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isCustomer: {
    type: Boolean,
    default: false,
  },
});

// Create a mongoose model based on the schema
const UserDetailModel = mongoose.model("userDetails", UserDetailSchema);

// Export the model for use in other parts of the application
module.exports = UserDetailModel;
