const express = require("express");
const {
  getAllQuestions,
  addQuestion,
  submitAnswer,
} = require("../controllers/quiz.controllers");
const jwtHandler = require("../utils/jwthandler");
// Creating a custom route using express.Router()
const quizRoute = express.Router();

// Route for fetching questions
quizRoute.get("/getQuestions", jwtHandler, getAllQuestions);
quizRoute.post("/addQuestion", jwtHandler, addQuestion);
quizRoute.post("/submitAnswer", jwtHandler, submitAnswer);

// Export the UserRoute for use in the main app
module.exports = quizRoute;
