// Preguntas variadas con "that" y nuevas estructuras
const allQuestions = [
  // Reported Statements
  {
    type: "multiple",
    question: "She said: 'I love chocolate.'",
    options: [
      "She said that she loved chocolate.",
      "She said that she loves chocolate.",
      "She said she has loved chocolate."
    ],
    answer: "She said that she loved chocolate."
  },
  {
    type: "multiple",
    question: "John said: 'I am working late tonight.'",
    options: [
      "John said that he was working late that night.",
      "John said that he is working late tonight.",
      "John said that he will work late."
    ],
    answer: "John said that he was working late that night."
  },
  {
    type: "multiple",
    question: "They said: 'We have finished our homework.'",
    options: [
      "They said that they had finished their homework.",
      "They said that they finished their homework.",
      "They said that they have finished their homework."
    ],
    answer: "They said that they had finished their homework."
  },
  {
    type: "multiple",
    question: "Emma said: 'I can cook well.'",
    options: [
      "Emma said that she could cook well.",
      "Emma said that she can cook well.",
      "Emma said that she was able to cook."
    ],
    answer: "Emma said that she could cook well."
  },
  {
    type: "multiple",
    question: "He said: 'I will travel to Japan.'",
    options: [
      "He said that he would travel to Japan.",
      "He said that he travels to Japan.",
      "He said that he will travel to Japan."
    ],
    answer: "He said that he would travel to Japan."
  },

  // Input Questions
  {
    type: "input",
    question: "Complete: She said: 'I am happy.' → She said that she ____ happy.",
    answer: "was"
  },
  {
    type: "input",
    question: "Complete: They said: 'We have been waiting.' → They said that they ____ been waiting.",
    answer: "had"
  },
  {
    type: "input",
    question: "Complete: He said: 'I saw her yesterday.' → He said that he ____ her the day before.",
    answer: "had seen"
  },
  {
    type: "input",
    question: "Complete: She said: 'I will call you.' → She said that she ____ call me.",
    answer: "would"
  },
  {
    type: "input",
    question: "Complete: I said: 'I can finish it.' → I said that I ____ finish it.",
    answer: "could"
  }
];

// Mezclar preguntas
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
