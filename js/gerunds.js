const allQuestions = [
  // Multiple Choice
  {
    type: "multiple",
    question: "She ____ never visited Paris.",
    options: ["has", "have", "had"],
    answer: "has"
  },
  {
    type: "multiple",
    question: "We ____ finished our homework.",
    options: ["has", "have", "had"],
    answer: "have"
  },
  {
    type: "multiple",
    question: "They ____ lived here for ten years.",
    options: ["has", "have", "had"],
    answer: "have"
  },
  {
    type: "multiple",
    question: "He ____ just eaten lunch.",
    options: ["have", "has", "is"],
    answer: "has"
  },
  {
    type: "multiple",
    question: "I ____ already seen that movie.",
    options: ["have", "has", "had"],
    answer: "have"
  },

  // Input
  {
    type: "input",
    question: "Complete: She ____ (work) here since 2020.",
    answer: "has worked"
  },
  {
    type: "input",
    question: "Complete: We ____ (not finish) our project yet.",
    answer: "have not finished"
  },
  {
    type: "input",
    question: "Complete: He ____ (visit) London three times.",
    answer: "has visited"
  },
  {
    type: "input",
    question: "Complete: I ____ (never / be) to Japan.",
    answer: "have never been"
  },
  {
    type: "input",
    question: "Complete: They ____ (just / arrive) at the airport.",
    answer: "have just arrived"
  }
];

const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

let current = 0;
let correctAnswers = 0;

const container = document.getElementById("question-container");
const feedback = document.getElementById("feedback");

function showQuestion() {
  const q = shuffled[current];

  let content = `<p><strong>${q.question}</strong></p>`;

  if (q.type === "multiple") {
    content += q.options
      .map(opt => `<button class="btn btn-option" onclick="checkAnswer(this, '${opt}')">${opt}</button>`)
      .join("<br>");
  } else if (q.type === "input") {
    content += `
      <input type="text" id="user-input" class="form-control w-50 mx-auto my-2" placeholder="Type your answer" />
      <button class="btn btn-success mt-2" onclick="checkInputAnswer()">Submit</button>
    `;
  }

  container.innerHTML = content;
  feedback.textContent = "";
}

function checkAnswer(button, selected) {
  const correct = shuffled[current].answer;
  const buttons = document.querySelectorAll(".btn-option");

  buttons.forEach(btn => btn.disabled = true);

  if (selected === correct) {
    correctAnswers++;
    feedback.innerHTML = "✅ Correct!";
    button.classList.add("correct");
  } else {
    feedback.innerHTML = `❌ Wrong. Correct answer: <strong>${correct}</strong>`;
    button.classList.add("incorrect");
    buttons.forEach(btn => {
      if (btn.textContent === correct) btn.classList.add("correct");
    });
  }

  showNextButton();
}

function checkInputAnswer() {
  const userInput = document.getElementById("user-input").value.trim().toLowerCase();
  const correct = shuffled[current].answer.toLowerCase();

  if (userInput === correct) {
    correctAnswers++;
    feedback.innerHTML = "✅ Correct!";
  } else {
    feedback.innerHTML = `❌ Wrong. Correct answer: <strong>${shuffled[current].answer}</strong>`;
  }

  showNextButton();
}

function showNextButton() {
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next Question ▶";
  nextBtn.className = "btn btn-primary mt-3";
  nextBtn.onclick = next;
  feedback.appendChild(document.createElement("br"));
  feedback.appendChild(nextBtn);
}

function next() {
  current++;
  if (current < shuffled.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  let message = "";
  let imagePath = "";

  if (correctAnswers <= 3) {
    message = "😢 Keep practicing! You’re just getting started.";
    imagePath = "./img/cheems3.jpg";
  } else if (correctAnswers <= 5) {
    message = "🙂 Not bad! A bit more practice and you'll master it!";
    imagePath = "./img/cheems.jpg";
  } else if (correctAnswers <= 7) {
    message = "😊 Good job! You're getting the hang of it!";
    imagePath = "./img/cheems4.jpg";
  } else {
    message = "🏆 Excellent! You're a grammar pro!";
    imagePath = "./img/cheems2.jpg";
  }

  container.innerHTML = `
    <h3>🎉 You've completed all questions!</h3>
    <p class="fs-5">✅ You got <strong>${correctAnswers}</strong> out of <strong>${shuffled.length}</strong> correct.</p>
    <p class="mt-3 fs-5">${message}</p>
    <img src="${imagePath}" alt="Score image" class="score-image mt-3 mb-4"/>

    <div class="d-flex justify-content-center gap-3 mt-4">
      <button class="btn btn-secondary" onclick="location.href='index.html'">🏠 Back to Menu</button>
      <button class="btn btn-primary" onclick="location.reload()">🔁 Try Again</button>
    </div>
  `;
  feedback.textContent = "";
}

showQuestion();
