const viewHighscore = document.getElementById("highscore");
const viewScore = document.getElementById("highscores");
const timer = document.getElementById("time");
const startPage = document.getElementById("start-page");
const startQuizBtn = document.getElementById("start-quiz");
const start = document.getElementById("start");
const header = document.getElementById("header");
const quizBody = document.getElementById("quiz-body");
let timerCountdown = undefined;
let clearAnswer = undefined;

// decrement clock by one second and check for expired time
const countDown = function () {
    timeLeft = timer.textContent - 1;
    timer.textContent = `${timeLeft}`;
    if (timeLeft <= 0) {
        return stopGame();
    }
};