// Initialize variables to keep track of the current question index and store all questions
let currentQuestionIndex = 0;
let allQuestions = [];
let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
let userId;

// Authorization token
const token = sessionStorage.getItem("token");
const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: token,
});

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
      window.location.href = "login.html"; // Redirect to login.html on error
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

  const heading = document.createElement("h3");
  heading.innerText = `You have attempted ${currentQuestionIndex} no. of Questions`;
  questionDiv.appendChild(heading);

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
      correctAnswerCount++;
    } else {
      incorrectAnswerCount++;
    }

    // Move to the next question
    currentQuestionIndex++;

    // Check if there are more questions
    if (currentQuestionIndex < allQuestions.length) {
      // Display the next question
      displayCurrentQuestion();
    } else {
      updateResultContainerVisibility();
    }
  } else {
    console.log("Please select an answer.");
  }
}

// Reset quiz and fetch new set of questions
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

      // Reset quiz-related variables
      currentQuestionIndex = 0;
      correctAnswerCount = 0;
      incorrectAnswerCount = 0;

      // Hide result container and show quiz container
      const resultContainer = document.getElementById("result-container");
      resultContainer.style.display = "none";
      const quizContainer = document.getElementById("quiz-container");
      quizContainer.style.display = "block";

      // Display the first question of the new set
      displayCurrentQuestion();
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  }
}

// Function to update the visibility of the result container and display scores
function updateResultContainerVisibility() {
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = "block";
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.style.display = "none";

  // Display scores
  const correctAnswerSpan = document.getElementById("correct");
  correctAnswerSpan.innerText = correctAnswerCount;
  const inCorrectAnswerSpan = document.getElementById("incorrect");
  inCorrectAnswerSpan.innerText = incorrectAnswerCount;

  // Calculate the percentage of correct answers
  const score = Math.round((correctAnswerCount / allQuestions.length) * 100);
  const scoreSpan = document.getElementById("score");
  scoreSpan.innerText = `${score}%`;
}

// Logout function with additional logic
async function logout() {
  if (currentQuestionIndex >= allQuestions.length) {
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
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
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  }
}

// Fetch and display questions when the page loads
getAllQuestions();
