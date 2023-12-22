const UserModel = require("../models/userSchema.model");
const bcryptPassword = require("../utils/bcryptPassword");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const quizModel = require("../models/quizQuestionSchema.model");

// Function to register a new user
const RegisterUser = async (req, res) => {
  try {
    // Extract user information from the request body
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
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    // Optionally, associate quiz questions with the user upon registration
    const updatedQuizQuestions = await quizModel.updateMany(
      { userId: null },
      { $set: { userId: user._id } }
    );

    // Generate a JWT token for the new user
    const token = jwt.sign(
      {
        data: user._id, // Use user._id instead of user._id
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Set the user ID in the session
    req.session.user = user._id;

    const sessionData = {
      sessionId: req.sessionID,
      createdAt: new Date(),
    };

    // Update the user's session information in the database
    await UserModel.findByIdAndUpdate(user._id, {
      $set: { session: sessionData },
    });

    // Return success message, inserted data, and the generated token
    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
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
  try {
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
    const isMatchedPassword = await bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      return res.json({
        message: `User is not able to login due to wrong password.`,
      });
    }

    // Set the user ID in the session
    req.session.user = user._id; // Ensure this line is present

    const token = jwt.sign(
      {
        data: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Optionally, associate quiz questions with the user upon login
    const updatedQuizQuestions = await quizModel.updateMany(
      { userId: null },
      { $set: { userId: user._id } }
    );

    const sessionData = {
      sessionId: req.sessionID,
      createdAt: new Date(),
    };

    // Update the user's session information in the database
    await UserModel.findByIdAndUpdate(user._id, {
      $set: { session: sessionData },
    });

    return res.json({
      message: `User is logged in`,
      token,
      updatedQuizQuestions,
    });
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const LogoutUser = async (req, res) => {
  try {
    // Retrieve the user ID from the session, assuming it's stored there during login
    const userId = req.session.userId;

    // Check if the user is logged in
    if (!userId) {
      return res.status(401).json({
        message: "User is not logged in.",
      });
    }

    // Clear the user's session
    req.session.destroy(async (err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

      // Optionally, update the user's session information in the database
      await UserModel.findByIdAndUpdate(userId, { $unset: { session: "" } });

      return res.json({
        message: "Logout successful",
      });
    });
  } catch (error) {
    console.error("Error during user logout:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const reloadQuiz = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await UserModel.findOne({ _id: userId });

    // Check if the user with the given ID exists
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!req.sessionID) {
      return res.status(401).json({
        message: "Unauthorized. Please log in.",
      });
    }

    // Reset the user's score to 0
    user.score = 0;

    // Save the updated user score
    await user.save();

    // Return success message and updated user information
    res.status(200).json({
      message: "Quiz reloaded successfully",
      user,
    });
  } catch (error) {
    console.error("Error reloading quiz:", error);

    // Return a more informative error message
    res.status(500).json({
      message: "Error reloading quiz. Please try again later.",
      error: error.message,
    });
  }
};

// Exporting functions for use in the routes
module.exports = {
  LoginUser,
  RegisterUser,
  reloadQuiz,
  LogoutUser,
};
