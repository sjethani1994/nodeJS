const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define a schema for quiz questions
const quizQuestionsSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      optionText: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Remove leading and trailing whitespaces
      },
    },
  ],
  correctOption: {
    type: String,
    default: "", // You can set a default value if needed
  },
  isCorrect: {
    type: Boolean,
    default: false, // You can set a default value if needed
  },
  score: {
    type: Number,
    default: 0, // You can set a default value if needed
  },
});

// Create a mongoose model based on the schema
const QuizQuestionsModel = mongoose.model("QuizQuestions", quizQuestionsSchema);

// Export the model for use in other parts of the application
module.exports = QuizQuestionsModel;
