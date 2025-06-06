// Sample questions array (you can replace with your own)
const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "What is the largest mammal?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippo"],
    answer: "Blue Whale"
  },
  {
    id: 4,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    id: 5,
    question: "What is the boiling point of water (°C)?",
    options: ["90", "100", "110", "120"],
    answer: "100"
  }
];

// Render questions and options dynamically
function renderQuiz() {
  const container = document.getElementById('questions');
  container.innerHTML = '';

  quizQuestions.forEach(({id, question, options}) => {
    const div = document.createElement('div');
    div.className = 'question-block';

    // Question text
   const qText = document.createElement('p');
	qText.textContent = question;  // Just the question text without numbering
    div.appendChild(qText);

    // Options radio buttons
    options.forEach(option => {
      const label = document.createElement('label');
      label.style.display = "block";

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `question-${id}`;
      radio.value = option;

      // Restore selection from sessionStorage
      const savedProgress = JSON.parse(sessionStorage.getItem('progress') || '{}');
      if (savedProgress[id] === option) {
        radio.checked = true;
      }

      // On change, save selection to sessionStorage
      radio.addEventListener('change', () => {
        saveProgress(id, option);
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));
      div.appendChild(label);
    });

    container.appendChild(div);
  });
}

// Save selected option for a question in sessionStorage
function saveProgress(questionId, selectedOption) {
  const progress = JSON.parse(sessionStorage.getItem('progress') || '{}');
  progress[questionId] = selectedOption;
  sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Calculate score and display it, also save in localStorage
function submitQuiz() {
  const progress = JSON.parse(sessionStorage.getItem('progress') || '{}');
  let score = 0;
  let answeredCount = 0;

  quizQuestions.forEach(({id, answer}) => {
    if (progress[id]) {
      answeredCount++;
      if (progress[id] === answer) {
        score++;
      }
    }
  });

  const scoreDiv = document.getElementById('score');
  scoreDiv.textContent = `Your score is ${score} out of ${quizQuestions.length}.`;

  localStorage.setItem('score', score);

  // Optionally clear sessionStorage progress after submit:
  // sessionStorage.removeItem('progress');
}

// On page load, render quiz and restore score if present
window.onload = () => {
  renderQuiz();

  // Restore score from localStorage (if any)
  const savedScore = localStorage.getItem('score');
  if (savedScore !== null) {
    document.getElementById('score').textContent = `Your score is ${savedScore} out of ${quizQuestions.length}.`;
  }

  document.getElementById('submit').addEventListener('click', submitQuiz);
};

