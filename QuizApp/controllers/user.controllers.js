const UserModel = require("../models/userSchema.model");
const bcryptPassword = require("../utils/bcryptPassword");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library
// Function to register a new user
const RegisterUser = async (req, res) => {
  try {
    // Extracting user information from the request body
    const { email, password, username } = req.body;
    const hashedPassword = await bcryptPassword(password);

    // Check if the email already exists in the database
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered. Please use a different email.",
      });
    }

    // Create the new user
    const insertedData = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    // Return success message and inserted data
    res.status(201).json({
      message: "User registered successfully",
      insertedData,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    // Return error message
    res.status(500).json({
      message: error.message,
    });
  }
};

// Function to authenticate and login a user
const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if required credentials are provided
  if (!email || !password) {
    return res.json({
      message: "Please enter both email and password.",
    });
  }

  // Check if the user with the provided email exists
  const user = await UserModel.findOne({ email: email });

  if (!user) {
    return res.json({
      message: `User with this ${email} is not found.`,
    });
  }

  const ismatchedPassword = await bcrypt.compare(password, user.password);
  if (ismatchedPassword) {
    const token = jwt.sign(
      {
        data: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    return res.json({
      message: `User is loggedin`,
      token,
    });
  }

  // Check if the provided password matches the stored password
  if (user.password === password) {
    return res.json({
      message: `User with ${email} has been logged in.`,
    });
  }

  // Return a message for incorrect password
  res.json({
    message: `User is not able to login due to wrong password.`,
  });
};

// Exporting functions for use in the routes
module.exports = {
  LoginUser,
  RegisterUser,
};