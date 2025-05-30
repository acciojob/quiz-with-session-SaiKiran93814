const questions = [
  {
    question: "What is the highest mountain in the world?",
    choices: ["K2", "Everest", "Kangchenjunga", "Lhotse"],
    answer: "Everest",
  },
  {
    question: "What is the capital of France?",
    choices: ["Paris", "Rome", "Madrid", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Venus", "Mars", "Jupiter"],
    answer: "Mars",
  },
  {
    question: "What is the chemical symbol for water?",
    choices: ["O2", "H2O", "CO2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["Mark Twain", "William Shakespeare", "Charles Dickens", "Jane Austen"],
    answer: "William Shakespeare",
  },
];

const questionsElement = document.getElementById("questions");

// Retrieve saved answers from sessionStorage or empty array
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionDiv.appendChild(questionText);

    // Choices
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];

      const label = document.createElement("label");
      label.style.display = "block"; // So each choice is on a new line

      const choiceInput = document.createElement("input");
      choiceInput.type = "radio";
      choiceInput.name = `question-${i}`;
      choiceInput.value = choice;

      // Check if this choice was previously selected
      if (userAnswers[i] === choice) {
        choiceInput.checked = true;
      }

      // When user selects an answer, save progress to sessionStorage
      choiceInput.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      label.appendChild(choiceInput);
      label.appendChild(document.createTextNode(choice));

      questionDiv.appendChild(label);
    }

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Submit button handler example to calculate score and store in localStorage
document.getElementById("submit").addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }
  document.getElementById("score").textContent = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

