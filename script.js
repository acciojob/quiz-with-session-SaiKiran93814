// Questions data (do not change this part)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris"
  },
  // Add 4 more questions similarly
];

// Render questions dynamically
function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `<p>${index + 1}. ${q.question}</p>`;
    q.choices.forEach((choice, cIndex) => {
      const id = `q${index}_c${cIndex}`;
      div.innerHTML += `
        <label>
          <input type="radio" name="q${index}" value="${choice}" id="${id}" ${progress[index] === choice ? "checked" : ""}>
          ${choice}
        </label><br>`;
    });
    container.appendChild(div);
  });

  addListeners();
}

// Store selected answers in sessionStorage
function addListeners() {
  document.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
      const qIndex = parseInt(radio.name.replace("q", ""));
      progress[qIndex] = radio.value;
      sessionStorage.setItem("progress", JSON.stringify(progress));
    });
  });
}

// Score calculation on submit
document.getElementById("submit").addEventListener("click", () => {
  const progress = JSON.parse(sessionStorage.getItem("progress") || "{}");
  let score = 0;
  questions.forEach((q, i) => {
    if (progress[i] === q.answer) score++;
  });
  document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}.`;
  localStorage.setItem("score", score);
});

window.onload = () => {
  renderQuestions();
  const lastScore = localStorage.getItem("score");
  if (lastScore) {
    document.getElementById("score").innerText = `Your score is ${lastScore} out of ${questions.length}.`;
  }
};
