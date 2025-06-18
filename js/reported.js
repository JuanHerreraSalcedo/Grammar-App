const allQuestions = [
  // Multiple choice
  {
    type: "multiple",
    question: "He said: 'I am tired.'",
    options: [
      "He said he was tired.",
      "He said he is tired.",
      "He said he had been tired."
    ],
    answer: "He said he was tired."
  },
  {
    type: "multiple",
    question: "She said: 'I will help you tomorrow.'",
    options: [
      "She said she would help me tomorrow.",
      "She said she helps me.",
      "She said she would help me the next day."
    ],
    answer: "She said she would help me the next day."
  },
  {
    type: "multiple",
    question: "They said: 'We are leaving now.'",
    options: [
      "They said they are leaving now.",
      "They said they were leaving then.",
      "They said they left now."
    ],
    answer: "They said they were leaving then."
  },
  {
    type: "multiple",
    question: "She said: 'I can drive.'",
    options: [
      "She said she could drive.",
      "She said she can drive.",
      "She said she will drive."
    ],
    answer: "She said she could drive."
  },
  {
    type: "multiple",
    question: "He said: 'I have finished my homework.'",
    options: [
      "He said he finished his homework.",
      "He said he had finished his homework.",
      "He said he has finished his homework."
    ],
    answer: "He said he had finished his homework."
  },

  // Fill in the blank
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

// Mezclar y seleccionar 10 preguntas
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
