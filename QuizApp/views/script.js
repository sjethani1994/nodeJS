// Initialize variables to keep track of the current question index and store all questions
let currentQuestionIndex = 0;
let allQuestions = [];

// Authorization token
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjU3YWI0NTdlMGUzODJiMTE4YzBiOGJlIiwiaWF0IjoxNzAyNzk1NDA5LCJleHAiOjE3MDI3OTkwMDl9.-pt0L4Vp8qLrBCQcqpWXUTAIxeUDXbqENQYTGhs6How";

const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: token,
});

let userId;

// Fetch questions from the server
function getAllQuestions() {
  fetch("http://localhost:5000/quiz/getQuestions", { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      // Store all questions
      allQuestions = data.quizQuestions;
      userId = data.userId;
      // Display the first question after fetching
      displayCurrentQuestion();
    })
    .catch((error) => {
      console.error("Error fetching questions:", error);
    });
}

// Display the current question and options
function displayCurrentQuestion() {
  const questionContainer = document.getElementById("question");
  const optionsContainer = document.getElementById("options");

  // Clear previous content
  questionContainer.innerHTML = "";
  optionsContainer.innerHTML = "";

  // Retrieve the current question object
  const currentQuestion = allQuestions[currentQuestionIndex];

  // Create a new question container for each question
  const questionDiv = document.createElement("div");
  questionDiv.className = "question";

  // Display current question
  const questionText = document.createElement("p");
  questionText.innerText = currentQuestion.questionText;
  questionDiv.appendChild(questionText);

  // Display options with radio buttons
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.className = "option";
    li.style.listStyleType = "none";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = option.optionText;
    input.id = `option${index}`;
    input.style.marginTop = "0.5rem";
    input.style.marginLeft = "0rem";
    input.setAttribute("class", "form-check-input");

    const label = document.createElement("label");
    label.innerText = option.optionText;
    label.setAttribute("for", `option${index}`);
    label.setAttribute("class", "form-check-label");
    label.style.marginLeft = "1.5rem";
    li.appendChild(input);
    li.appendChild(label);
    questionDiv.appendChild(li);
  });

  // Append the entire question container to the main container
  questionContainer.appendChild(questionDiv);
}

// Handle the submission of an answer
async function submitAnswer() {
  // Add logic to handle user's answer
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    const currentQuestion = allQuestions[currentQuestionIndex];
    const answerData = {
      correctOption: selectedAnswer.value,
      id: currentQuestion._id,
      userId: userId,
    };

    try {
      const response = await fetch("http://localhost:5000/quiz/submitAnswer", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(answerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }

    if (currentQuestion.correctOption === selectedAnswer.value) {
      console.log("Correct Answer");
    } else {
      console.log("Wrong Answer");
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < allQuestions.length) {
      // Display the next question
      displayCurrentQuestion();
    } else {
      console.log("Quiz completed!");
      updateReloadButtonVisibility();
    }
  } else {
    console.log("Please select an answer.");
  }
}

async function reloadQuiz() {
  if (currentQuestionIndex >= allQuestions.length) {
    try {
      const response = await fetch("http://localhost:5000/user/reloadQuiz", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  }
}

// Function to update the visibility of the Reload Quiz button
function updateReloadButtonVisibility() {
  const reloadButton = document.getElementById("reloadQuizBtn");
  reloadButton.style.display = "inline"; // Show the button
}

// Fetch and display questions when the page loads
getAllQuestions();
