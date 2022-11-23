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


// random num generator
const randomNum = function(min, max) {
    let num = Math.floor(Math.random() * (max + 1 - min)) + min;
    return num;
}
// decrement clock by one second and check for expired time
const countDown = function () {
    timeLeft = timer.textContent - 1;
    timer.textContent = `${timeLeft}`;
    if (timeLeft <= 0) {
        return stopQuiz();
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
];

const startQuiz = function() {
    const startScreen = {
        id: "start-page",
    }
    // hides contents on start page
    hidePage(startScreen);
    // adds 75 sec to clock
    timer.textContent = '75';
    // selects first quiz question
    newQuestion(null);
}

const hidePage = function(objEl) {
    // elemts that will be hidden
    objValues = Object.values(objEl);

    for (i=0; i < objValues.length; i++) {
        let quizScreen = document.getElementById(objValues[i]);
        quizScreen.style.display = "none";
    }
    return;
}

const showAnswer = function(answer) {
    let selectedAnswerContainer = document.getElementById('wrong-correct-container')

    if (selectedAnswerContainer === null) {
        selectedAnswerContainer = document.createElement('section')
        selectedAnswerContainer.id = 'wrong-correct-container';
        selectedAnswerContainer.style.display = 'none';
        quizBody.appendChild(selectedAnswerContainer);

        const showSelectedAnswer = document.createElement('p');
        showSelectedAnswer.id = 'wrong-correct';
        showSelectedAnswer.appendChild(showSelectedAnswer);
        return;
    } else if (answer === null) {
        selectedAnswerContainer.style.display = 'none';
        return;
    }

    clearTimeout(clearAnswer);

    const showSelectedAnswer = document.getElementById('wrong-correct');

    // display wrong/correct response
    if (answer) {
        showSelectedAnswer.textContent = `Correct!`
    } else if (answer === false) {
        showSelectedAnswer.textContent = `Wrong!`
    }
    selectedAnswerContainer.style.display = 'flex';
    showSelectedAnswer.style.display = 'flex';

    // set response to cleared in 5 seconds
    clearAnswer = setTimeout(answerCleared, 5000);
}

// stops displaying answer to previous question
const answerCleared = function() {
    const element = document.getElementById('wrong-correct-container');
    if (element) {
        answer = {
            id: 'wrong-correct-container',
        }
        hidePage(answer);
    }
}

// creates a new question at random 
const newQuestion = function(lastAnswer) {
    showAnswer(lastAnswer);

    // clock start counting down
    if (timerCountdown === undefined) {
        timerCountdown = setInterval(countDown, 1000);
    }

    // question to be displayed
    const question = selectQuestion();
    const questionContainer = document.getElementById('question-container');
    // display question
    if ((questionContainer) && questionContainer.style.display === 'none') {
        questionContainer.style.display = 'flex';
    }

    if (!questionContainer) {
        const section = document.createElement('section');
        section.className = 'question-container';
        section.id = 'question-container'

        // create h2 question header
        const heading = document.createElement('h2');
        heading.className = 'question-header';
        heading.textContent = Object.values(question)[1];
        section.appendChild(heading)

        // div button container
        const answersContainer = document.createElement('div');
        answersContainer.className = 'answers-container';
        section.appendChild(answersContainer);

        // create button one at a time
        for (let i=0; i < 4; i++) {
            let answerBtn = document.createElement('button');
            answerBtn.className = 'answer-btn';
            answerBtn.textContent = `${i+1}. ${Object.values(question)[2][i][0]}`;
            answerBtn.id = `answer-${Object.values(question)[2][i][1]}`;
            answersContainer.appendChild(answerBtn);
        }

        // append section to main body
        start.appendChild(section);

        answerBtnEl = document.querySelectorAll(".answer-btn");
        // Add event listener to buttons
        for (let i=0; i < answerBtnEl.length; i++) {
            answerBtnEl[i].addEventListener('click', checkQuestion)
        }
    } else if (question === false) {
        stopQuiz();
    } else {
        const answerBtns = document.querySelectorAll('.answer-btn')
        for (let i=0; i < 4; i++) {
            answerBtns[i].textContent = `${i+1}. ${Object.values(question)[2][i][0]}`;
            answerBtns[i].id = `answer-${Object.values(question)[2][i][1]}`;
        }
    }
}

const selectQuestion = function () {
    let remainingQuestions = [];

    // loop through all questions
    for (let i=0; i < questions.length; i++) {
        answered = Object.values(questions[i])[0]
        if (!answered) {
            remainingQuestions.push(i)
        }
    }

    // if no questions are left end quiz
    if (remainingQuestions.length === 0) {
        return false;
    }

    // Choose randomize question
    let remainingQuestionsIndex = randomNum(0, remainingQuestions.length - 1);
    let questionIndex = remainingQuestions[remainingQuestionsIndex]
    let choice = questions[questionIndex];

    // mark question as asked
    choice.answered = true;

    return choice;
}

const questionCheck = function() {
    // check if user answers correct
    const userAnswer = this.id;
    console.log(userAnswer)

    if (userAnswer === 'answer-false') {
        // reduce time by 10 secs if wrong answer
        currentTime = parseInt(timer.textContent);;
        timer.textContent = `${currentTime - 10}`;

        // end quiz if timer is below zero after wrong answer is selected
        if (currentTime <= 0) {
            return stopQuiz();
        }

        return newQuestion(false);
    }
    return newQuestion(true);
}

// end page where user can see score and enter intitals
const stopQuiz = function () {
    // stop timer/ reset timer
    clearTimeout(timerCountdown);
    timerCountdown = undefined;

    // remove questions from screen
    const screenObj = {
        id: 'question-container',
    }
    hideScreen(screenObj);

    // display html if it exits
    const stopEl = document.getElementById('stop-container');
    if ((stopEl) && stopEl.style.display === 'none') {
        stopEl.style.display = 'flex';

        let finalQuizScore = parseInt(timer.innerText);
        const finalScore = document.getElementById('final-score');
        finalScore.textContent = `Your final score is ${finalQuizScore}`;

        // empty input from previous entry
        const inputEl = document.getElementById('input-initials');
        inputEl.value = '';
        return;
    }
}