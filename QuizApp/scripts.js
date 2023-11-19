// Importing necessary modules
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
// Middleware to parse incoming request bodies
app.use(express.json());
app.use(cors());
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    correctOption: 0,
  },

  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctOption: 0,
  },

  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctOption: 1,
  },

  {
    id: 4,
    question: 'Who wrote "Romeo and Juliet"?',
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correctOption: 1,
  },

  {
    id: 5,
    question: "In which year did the Titanic sink?",
    options: ["1905", "1912", "1920", "1931"],
    correctOption: 1,
  },

  {
    id: 6,
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctOption: 2,
  },

  {
    id: 7,
    question: 'Which element has the chemical symbol "O"?',
    options: ["Oxygen", "Gold", "Iron", "Carbon"],
    correctOption: 0,
  },

  {
    id: 8,
    question: "What is the currency of Brazil?",
    options: ["Peso", "Real", "Dollar", "Euro"],
    correctOption: 1,
  },

  {
    id: 9,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correctOption: 2,
  },

  {
    id: 10,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Southern Ocean",
      "Pacific Ocean",
    ],
    correctOption: 3,
  },
];

app.get("/getAllQuestions", (req, res) => {
  try {
    // Sending all Questions as response
    res.send(quizQuestions);
  } catch (error) {
    console.error("Rejected:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Starting the server
app.listen(port, () => {
  console.log("Server Started");
});
