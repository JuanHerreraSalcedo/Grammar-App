const allQuestions = [
  // 5 Multiple Choice
  {
    type: "multiple",
    question: "He said: 'I am tired.'",
    options: ["He said he was tired.", "He said he is tired.", "He said he had been tired."],
    answer: "He said he was tired."
  },
  {
    type: "multiple",
    question: "She said: 'I will help you tomorrow.'",
    options: ["She said she would help me tomorrow.", "She said she helps me.", "She said she would help me the next day."],
    answer: "She said she would help me the next day."
  },
  {
    type: "multiple",
    question: "They said: 'We are leaving now.'",
    options: ["They said they are leaving now.", "They said they were leaving then.", "They said they left now."],
    answer: "They said they were leaving then."
  },
  {
    type: "multiple",
    question: "She said: 'I can drive.'",
    options: ["She said she could drive.", "She said she can drive.", "She said she will drive."],
    answer: "She said she could drive."
  },
  {
    type: "multiple",
    question: "He said: 'I have finished my homework.'",
    options: ["He said he finished his homework.", "He said he had finished his homework.", "He said he has finished his homework."],
    answer: "He said he had finished his homework."
  },

  // 5 Input
  {
    type: "input",
    question: "Complete: She said: 'I am studying.' → She said she ____ studying.",
    answer: "was"
  },
  {
    type: "input",
    question: "Complete: He said: 'I have been working.' → He said he ____ been working.",
    answer: "had"
  },
  {
    type: "input",
    question: "Complete: They said: 'We will come.' → They said they ____ come.",
    answer: "would"
  },
  {
    type: "input",
    question: "Complete: I said: 'I can do it.' → I said I ____ do it.",
    answer: "could"
  },
  {
    type: "input",
    question: "Complete: She said: 'I saw him.' → She said she ____ him.",
    answer: "had seen"
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
    imagePath = "./img/cheems4.png";
  } else {
    message = "🏆 Excellent! You're a grammar pro!";
    imagePath = "./img/cheems2.png";
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
