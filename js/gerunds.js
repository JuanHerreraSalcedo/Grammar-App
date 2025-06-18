const allQuestions = [
  // Multiple Choice
  {
    type: "multiple",
    question: "She enjoys ____ (read) novels.",
    options: ["to read", "reading", "read"],
    answer: "reading"
  },
  {
    type: "multiple",
    question: "He decided ____ (move) to Canada.",
    options: ["moving", "to move", "move"],
    answer: "to move"
  },
  {
    type: "multiple",
    question: "We agreed ____ (meet) at 5 PM.",
    options: ["to meet", "meeting", "meet"],
    answer: "to meet"
  },
  {
    type: "multiple",
    question: "They avoided ____ (talk) about the problem.",
    options: ["to talk", "talking", "talk"],
    answer: "talking"
  },
  {
    type: "multiple",
    question: "I hope ____ (see) you again soon.",
    options: ["seeing", "to see", "see"],
    answer: "to see"
  },

  // Input type
  {
    type: "input",
    question: "Complete: I can’t stand ____ (wait) in line.",
    answer: "waiting"
  },
  {
    type: "input",
    question: "Complete: She refused ____ (help) him.",
    answer: "to help"
  },
  {
    type: "input",
    question: "Complete: He suggested ____ (go) to the park.",
    answer: "going"
  },
  {
    type: "input",
    question: "Complete: We promised ____ (call) her.",
    answer: "to call"
  },
  {
    type: "input",
    question: "Complete: They enjoy ____ (travel) abroad.",
    answer: "traveling"
  }
];

// Selección aleatoria de 10 preguntas
const shuffled = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

let current = 0;
const container = document.getElementById("question-container");
const feedback = document.getElementById("feedback");

function showQuestion() {
  const q = shuffled[current];

  if (q.type === "multiple") {
    container.innerHTML = `
      <p><strong>${q.question}</strong></p>
      ${q.options.map(opt => `<button class="btn btn-outline-primary my-2" onclick="checkAnswer('${opt}')">${opt}</button>`).join("<br>")}
    `;
  } else if (q.type === "input") {
    container.innerHTML = `
      <p><strong>${q.question}</strong></p>
      <input type="text" id="user-input" class="form-control w-50 mx-auto my-2" placeholder="Type your answer" />
      <button class="btn btn-success" onclick="checkInputAnswer()">Submit</button>
    `;
  }
}

function checkAnswer(selected) {
  const correct = shuffled[current].answer;
  if (selected === correct) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = `❌ Wrong. Correct answer: ${correct}`;
  }
  next();
}

function checkInputAnswer() {
  const userInput = document.getElementById("user-input").value.trim().toLowerCase();
  const correct = shuffled[current].answer.toLowerCase();
  if (userInput === correct) {
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = `❌ Wrong. Correct answer: ${shuffled[current].answer}`;
  }
  next();
}

function next() {
  setTimeout(() => {
    feedback.textContent = "";
    current++;
    if (current < shuffled.length) {
      showQuestion();
    } else {
      container.innerHTML = "<p>🎉 You've completed all questions!</p>";
    }
  }, 1500);
}

showQuestion();
