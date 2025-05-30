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
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],  // added "Saturn" for 4 options
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

// Load saved score from localStorage (show if exists)
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreElement.textContent = `Your score is ${savedScore} out of ${questions.length}.`;
}

// Render quiz questions and options
function renderQuestions() {
  questionsElement.innerHTML = ""; // clear before rendering

  questions.forEach((q, i) => {
    const questionDiv = document.createElement("div");

    // Question text with question number
    const questionText = document.createElement("p");
    questionText.textContent = `${i + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    // Create radio inputs for each choice
    q.choices.forEach((choice) => {
      const label = document.createElement("label");
      label.style.display = "block";  // each option on own line

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Check if previously selected
      if (progress[i] === choice) {
        input.checked = true;
      }

      // On change, save to sessionStorage
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

// Calculate score and display it, store in localStorage
function submitQuiz() {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (progress[i] && progress[i] === questions[i].answer) {
      score++;
    }
  }

  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
}

// Event listener for submit
submitButton.addEventListener("click", submitQuiz);

// Initial render
renderQuestions();
