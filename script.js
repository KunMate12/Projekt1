const questions = [
  {
    question: "Melyik évben kezdődött a második világháború?",
    answers: ["1939", "1945", "1914", "1920"],
    correct: 0
  },
  {
    question: "Melyik a legnagyobb bolygó a Naprendszerben?",
    answers: ["Föld", "Jupiter", "Mars", "Szaturnusz"],
    correct: 1
  },
  {
    question: "Mi a H2O közismertebb neve?",
    answers: ["Hidrogén", "Sav", "Víz", "Levegő"],
    correct: 2
  }
];

let score = 0;
let answered = 0;

const quizContainer = document.getElementById("quiz-container");
const resultDiv = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

function renderQuiz() {
  quizContainer.innerHTML = "";
  resultDiv.classList.add("hidden");
  restartBtn.classList.add("hidden");
  score = 0;
  answered = 0;

  questions.forEach((q, qIndex) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = `Kérdés ${qIndex + 1}: ${q.question}`;
    details.appendChild(summary);

    const answersDiv = document.createElement("div");
    answersDiv.classList.add("answers");

    q.answers.forEach((answer, aIndex) => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="radio" name="q${qIndex}" value="${aIndex}" />
        ${answer}
      `;
      answersDiv.appendChild(label);
    });

    const button = document.createElement("button");
    button.textContent = "✅ Válasz elküldése";
    button.classList.add("btn", "btn-primary", "mt-2");
    button.addEventListener("click", () => handleAnswer(qIndex, details));
    answersDiv.appendChild(button);

    details.appendChild(answersDiv);
    quizContainer.appendChild(details);
  });
}

function handleAnswer(qIndex, details) {
  const selected = document.querySelector(`input[name="q${qIndex}"]:checked`);
  if (!selected) {
    alert("Kérlek, válassz egy választ!");
    return;
  }

  const chosen = parseInt(selected.value);
  const question = questions[qIndex];

  if (chosen === question.correct) score++;

  answered++;

  details.open = false;
  details.querySelectorAll("input").forEach(input => (input.disabled = true));
  details.querySelector("button").disabled = true;
  details.style.opacity = "0.7";

  if (answered === questions.length) showResult();
}

function showResult() {
  const total = questions.length;
  const percentage = (score / total) * 100;
  let text = `Eredményed: ${score}/${total} (${Math.round(percentage)}%)`;

  resultDiv.classList.remove("good", "medium", "bad");

  if (percentage >= 80) {
    resultDiv.classList.add("good");
    text += " 🎉 Kiváló!";
  } else if (percentage >= 50) {
    resultDiv.classList.add("medium");
    text += " 🙂 Nem rossz, de lehet jobb is!";
  } else {
    resultDiv.classList.add("bad");
    text += " 😢 Próbáld újra!";
  }

  resultDiv.textContent = text;
  resultDiv.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", renderQuiz);
renderQuiz();
