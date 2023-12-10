const UserModel = require("../models/userSchema.model");

// Function to register a new user
const RegisterUser = async (req, res) => {
  try {
    // Extracting user information from the request body
    const { email, password, username } = req.body;

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
      password,
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

// Function to update user information
const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;

    // Check if a valid username is provided for the update
    if (!username) {
      return res.status(400).json({
        message: "Please provide a valid username for the update.",
      });
    }

    // Update the user information
    const updatedDoc = await UserModel.findByIdAndUpdate(
      userId,
      { username: username },
      { new: true }
    );

    // Check if the user with the provided userId is found
    if (!updatedDoc) {
      return res.status(404).json({
        message: `User with id ${userId} not found.`,
      });
    }

    // Return success message and updated data
    return res.json({
      message: `User with id ${userId} has been updated.`,
      updatedDoc,
    });
  } catch (error) {
    console.error("Error during user update:", error);
    // Return an internal server error message
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username } = req.body;

    // Check if a valid username is provided for deletion
    if (!username) {
      return res.status(400).json({
        message: "Please provide a valid username to delete the user.",
      });
    }

    // Check if the user with the provided userId is found
    const userToDelete = await UserModel.findById(userId);

    if (!userToDelete || userToDelete.username !== username) {
      return res.status(400).json({
        message: "Invalid username or User not found for the provided userId.",
      });
    }

    // Delete the user
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    // Check if the user is successfully deleted
    if (!deletedUser) {
      return res.status(404).json({
        message: `User with id ${userId} not found.`,
      });
    }

    // Return success message and deleted user data
    return res.json({
      message: `User with id ${userId} has been deleted successfully.`,
      deletedUser,
    });
  } catch (error) {
    console.error("Error during user deletion:", error);
    // Return an internal server error message
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Exporting functions for use in the routes
module.exports = {
  LoginUser,
  RegisterUser,
  updateUser,
  deleteUser,
};
