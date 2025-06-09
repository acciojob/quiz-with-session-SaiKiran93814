// Questions data (do not change this part)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

// Load saved answers from sessionStorage
let progress = {};
const savedProgress = sessionStorage.getItem("progress");
if (savedProgress) {
  try {
    progress = JSON.parse(savedProgress);
  } catch {
    progress = {};
  }
}

// Load saved score from localStorage
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
  disableInputs(); // disable inputs if quiz was already submitted
}

// Render quiz questions and options
function renderQuestions() {
  questionsElement.innerHTML = "";

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      label.style.display = "block";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      if (progress[i] === choice) {
        input.checked = true;
      }

      // Prevent input if already submitted
      if (savedScore !== null) {
        input.disabled = true;
      }

      input.addEventListener("change", () => {
        progress[i] = input.value;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
    });

    questionsElement.appendChild(questionDiv);
  });
}

// Disable all radio inputs and the submit button
function disableInputs() {
  const inputs = document.querySelectorAll("input[type='radio']");
  inputs.forEach(input => input.disabled = true);
  submitButton.disabled = true;
}

// Submit handler
function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] && progress[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);

  disableInputs(); // lock quiz
  // sessionStorage.removeItem("progress"); // optional: clear answers after submission
}

// Event listener
submitButton.addEventListener("click", submitQuiz);

// Initial render
renderQuestions();
