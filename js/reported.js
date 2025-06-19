const allQuestions = [
  {
    sentence: "She ____ never ____ sushi.",
    answer: ["has", "eaten"]
  },
  {
    sentence: "They ____ just ____ the game.",
    answer: ["have", "won"]
  },
  {
    sentence: "I ____ already ____ that movie.",
    answer: ["have", "seen"]
  },
  {
    sentence: "He ____ never ____ his homework on time.",
    answer: ["has", "finished"]
  },
  {
    sentence: "We ____ ____ to Paris twice.",
    answer: ["have", "been"]
  }
];

const container = document.getElementById("question-container");
const feedback = document.getElementById("feedback");

let current = 0;
let correctAnswers = 0;

function showQuestion() {
  const q = allQuestions[current];

  const dragOptions = shuffle([
    ...q.answer,
    ...getRandomDistractors(q.answer)
  ]);

  container.innerHTML = `
    <p class="mb-4"><strong>Complete the sentence:</strong></p>
    <h4>${q.sentence.replace(/____/g, '<span class="drop-zone" ondrop="drop(event)" ondragover="allowDrop(event)"></span>')}</h4>
    <div class="mt-4 d-flex flex-wrap justify-content-center">
      ${dragOptions.map(word => `<span class="drag-word" draggable="true" ondragstart="drag(event)" id="drag-${word}-${Math.random()}">${word}</span>`).join(" ")}
    </div>
    <button class="btn btn-success mt-4" onclick="checkDragAnswer()">Submit</button>
  `;
  feedback.textContent = "";
}

function getRandomDistractors(correctWords) {
  const pool = [
    "have", "has", "eaten", "gone", "been", "played",
    "won", "seen", "driven", "taken", "made", "read", "done"
  ];
  return shuffle(pool.filter(w => !correctWords.includes(w))).slice(0, 4);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.textContent);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  ev.target.textContent = data;
  ev.target.classList.add("filled");
}

function checkDragAnswer() {
  const drops = document.querySelectorAll(".drop-zone");
  const userAnswers = Array.from(drops).map(drop => drop.textContent.trim().toLowerCase());
  const correct = allQuestions[current].answer.map(a => a.toLowerCase());

  let isCorrect = JSON.stringify(userAnswers) === JSON.stringify(correct);

  if (isCorrect) {
    correctAnswers++;
    feedback.innerHTML = "✅ Correct!";
  } else {
    feedback.innerHTML = `❌ Wrong. Correct answer: <strong>${correct.join(" ")}</strong>`;
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
  if (current < allQuestions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  let message = "";
  let imagePath = "";

  if (correctAnswers <= 2) {
    message = "😢 Keep practicing!";
    imagePath = "./img/cheems3.jpg";
  } else if (correctAnswers === 3) {
    message = "🙂 You're getting better!";
    imagePath = "./img/cheems.jpg";
  } else if (correctAnswers === 4) {
    message = "😊 Well done!";
    imagePath = "./img/cheems4.jpg";
  } else {
    message = "🏆 Excellent work!";
    imagePath = "./img/cheems2.jpg";
  }

  container.innerHTML = `
    <h3>🎉 You've completed all questions!</h3>
    <p class="fs-5">✅ You got <strong>${correctAnswers}</strong> out of <strong>${allQuestions.length}</strong> correct.</p>
    <p class="mt-3 fs-5">${message}</p>
    <img src="${imagePath}" alt="Score image" class="score-image mt-3 mb-4"/>
    <div class="d-flex justify-content-center gap-3 mt-4">
      <button class="btn btn-secondary" onclick="location.href='index.html'">🏠 Back to Menu</button>
      <button class="btn btn-primary" onclick="location.reload()">🔁 Try Again</button>
    </div>
  `;
  feedback.textContent = "";
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

showQuestion();
