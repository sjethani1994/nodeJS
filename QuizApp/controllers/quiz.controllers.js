const quizModel = require("../models/quizQuestionSchema.model");
const UserModel = require("../models/userSchema.model");

// Retrieve all questions from the database
const getAllQuestions = async (req, res) => {
  try {
    // Fetch all questions from the database
    const quizQuestions = await quizModel.find();

    const userId = req.userId;

    // Return success message and retrieved questions
    res.status(200).json({
      message: "Questions retrieved successfully",
      quizQuestions,
      userId,
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

// const submitAnswer = async (req, res) => {
//   try {
//     const { correctOption, id, userId } = req.body;

//     // Use await to wait for the result of findById
//     const quizQuestion = await quizModel.findOne({ _id: id, userId: userId });

//     // Check if the question with the given ID and userId exists
//     if (!quizQuestion) {
//       return res.status(404).json({
//         message: "Question not found for the specified user",
//       });
//     }

//     // Check if the provided answer is correct
//     let isCorrect = false;
//     if (correctOption === quizQuestion.correctOption) {
//       isCorrect = true;

//       // Increase the score by 1
//       quizQuestion.score += 1;

//       // Save the updated question with the increased score
//       await quizQuestion.save();
//     }

//     // Return success message, retrieved question, and correctness status
//     res.status(200).json({
//       message: "Answer submitted successfully",
//       isCorrect: isCorrect,
//       quizQuestion: quizQuestion,
//     });
//   } catch (error) {
//     console.error("Error submitting answer:", error);

//     // Return error message
//     res.status(500).json({
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

const submitAnswer = async (req, res) => {
  try {
    const { correctOption, id } = req.body;

    // Use await to wait for the result of findById
    const quizQuestion = await quizModel.findOne({ _id: id});

    // Check if the question with the given ID and userId exists
    if (!quizQuestion) {
      return res.status(404).json({
        message: "Question not found for the specified user",
      });
    }

    // Check if the provided answer is correct
    let isCorrect = false;
    if (correctOption === quizQuestion.correctOption) {
      isCorrect = true;

      console.log(req);
      req.user.score += isCorrect ? 1 : 0;

      await req.user.save();
      // Save the updated question with the increased score
      await quizQuestion.save();
    }

    // Return success message, retrieved question, and correctness status
    res.status(200).json({
      message: "Answer submitted successfully",
      isCorrect: isCorrect,
      quizQuestion: quizQuestion,
    });
  } catch (error) {
    console.error("Error submitting answer:", error);

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
  submitAnswer,
};
