const quizModel = require("../models/quizQuestionSchema.model");
const bcryptPassword = require("../utils/bcryptPassword");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Retrieve all questions from the database
const getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const quizQuestions = await quizModel.find();

    // Return success message and retrieved questions
    res.status(200).json({
      message: "Questions retrieved successfully",
      quizQuestions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);

    // Return error message
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Add a new question to the database
const addQuestion = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { questionText, options, correctOption, isCorrect, score } = req.body;

    // Validate that required fields are present
    if (!questionText || !options || !correctOption) {
      return res
        .status(400)
        .json({ message: "Incomplete data. All fields are required." });
    }

    // Validate that options is an array with at least two elements
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        message: "Options must be an array with at least two elements.",
      });
    }

    // Create a new question in the database
    const insertedData = await quizModel.create({
      questionText,
      options,
      correctOption,
      isCorrect,
      score,
    });

    // Return success message and inserted question
    res.status(201).json({
      message: "Question added successfully",
      insertedData,
    });
  } catch (error) {
    console.error("Error adding question:", error);

    // Return error message
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Export functions for use in the routes
module.exports = {
  getAllQuestions,
  addQuestion,
};
