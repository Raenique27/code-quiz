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

let questions = [
    {
        answered: false,
        question: "Commonly used data types DO Not include:",
        answer: [["strings", false], ["booleans", false], ["alerts", true], ["numbers", false]]
    },
    {
        answered: false,
        question: "The condition in an if/else statement is enclosed with _________.",
        answer: [["quotes", false], ["curly brackets", false], ["square brackets", false], ["parenthesis", true]]
    },
    {
        answered: false,
        question: "Arrays in Javascript can be used to store _________.",
        answer: [["numbers and strings", false], ["other arrays", false], ["booleans", false], ["all of the above", true]]
    },
    {
        answered: false,
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answer: [["quotes", true],["commas", false], ["curly brackets", false], ["parenthesis", false]]
    },
    {
        answered: false,
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: [["JavaScript", false], ["terminal/bash", false], ["console.log", true], ["for loops", false]]
    }
]