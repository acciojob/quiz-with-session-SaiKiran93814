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
  }
];


    const questionsContainer = document.getElementById("questions");
    const submitBtn = document.getElementById("submit");
    const scoreDiv = document.getElementById("score");

    // Load saved progress from sessionStorage or start fresh
    let progress = {};
    if (sessionStorage.getItem("progress")) {
      progress = JSON.parse(sessionStorage.getItem("progress"));
    }

    // Load score from localStorage and display if exists
    if (localStorage.getItem("score") !== null) {
      scoreDiv.textContent = `Your score is ${localStorage.getItem("score")} out of ${quizData.length}.`;
    }

    // Render questions & options
    function renderQuiz() {
      questionsContainer.innerHTML = "";
      quizData.forEach((q, i) => {
        const questionDiv = document.createElement("div");
        questionDiv.innerHTML = `<p>${q.question}</p>`;


        q.options.forEach((opt, idx) => {
          const optionId = `q${i}_opt${idx}`;
          const isChecked = progress[i] === idx;
          const radioHTML = `
            <input 
              type="radio" 
              id="${optionId}" 
              name="question${i}" 
              value="${idx}" 
              ${isChecked ? "checked" : ""}
            />
            <label for="${optionId}">${opt}</label><br/>
          `;
          questionDiv.innerHTML += radioHTML;
        });
        questionsContainer.appendChild(questionDiv);
      });
    }

    renderQuiz();

    // Save progress on option change
    questionsContainer.addEventListener("change", (e) => {
      if (e.target && e.target.name.startsWith("question")) {
        const qIndex = parseInt(e.target.name.replace("question", ""), 10);
        const answerIndex = parseInt(e.target.value, 10);
        progress[qIndex] = answerIndex;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      }
    });

    // On submit, calculate score, store in localStorage, display score
    submitBtn.addEventListener("click", () => {
      let score = 0;
      quizData.forEach((q, i) => {
        if (progress[i] === q.answer) score++;
      });
      scoreDiv.textContent = `Your score is ${score} out of ${quizData.length}.`;
      localStorage.setItem("score", score);

      // Optionally clear progress so user can retake quiz freshly or keep it
      // sessionStorage.removeItem("progress");
    });

