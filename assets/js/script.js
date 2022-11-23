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

    // if html does not exist create it
    // container for end screen
    const stopQuizScreen = document.createElement('section');
    stopQuizScreen.id = 'stop-container';

    // header for end screen
    const stopQuizHeader = document.createElement('h2');
    stopQuizHeader.textContent = 'All done!';
    stopQuizScreen.appendChild(stopQuizHeader);

    // display final score on end of quiz screen
    const finalScore  = document.createElement('p');
    finalScore.id = 'final-score';
    let finalQuizScore = parseInt(timer.innerText);
    finalScore.textContent = `Your final score is ${finalQuizScore}`;
    stopQuizScreen.appendChild(finalScore);

    // container for submitted user intitials
    const initialsSubmitEl = document.createElement('form');
    initialsSubmitEl.id = 'submit-initials'
    stopQuizScreen.appendChild(initialsSubmitEl);

    // 'Enter initials' text
    const initialsEl = document.createElement('span');
    initialsEl.textContent = 'Enter initials:';
    initialsSubmitEl.appendChild(initialsEl);

    // input element
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.id = 'input-initials';
    initialsSubmitEl.appendChild(inputEl);

    // button
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.id = 'btn-submit';
    submitBtn.innerText = 'Submit'
    initialsSubmitEl.appendChild(submitBtn);
    initialsSubmitEl.addEventListener('submit', submitScore);

    // append to start page
    start.appendChild(stopQuizScreen);
}

const submitScore = function(event) {
    event.preventDefault();

    // check for user input
    const checkInput = collectScore();
    if (checkInput === false) {
        return;
    }
    return highscoresPage();
}

// store recent user score
const collectScore = function() {
    const userInitial = document.getElementById('input-initials').value
    const userFinalScore = timer.innerText;
    const userData = [userInitial, userFinalScore];

    // if nothing entered in input field by user alert user
    if (!userInitial) {
        alert('Please enter your intitials!');
        return false;
    }

    // collect highscore from storage
    const storedHighscore = 'High Score';
    let currentHighscore = JSON.parse(localStorage.getItem(storedHighscore));

    // if no high scores stored create local storage for high scores
    if (!currentHighscore) {
        const highscore = [userData];
        localStorage.setItem(storedHighscore, JSON.stringify(highscore));
        console.log('No highscores, local storage created!')
    } else {
        console.log('comparing user score with current highscores')
        compareScore(userData, currentHighscore);
        return true;
    }

    return true;
}

const highscoresPage =  function() {
    // stop timer and reset it
    clearTimeout(timerCountdown);
    timerCountdown = undefined;

    // clear screen so no previous answers are shown
    clearAnswer();

    const childrenEl = start.children;
    let chosenChild = undefined;
    for (let i=0; i < childrenEl.length; i++) {
        let displayChild = childrenEl[i].style.display
        if (displayChild != 'none' && childrenEl[i].nodeType == Node.ELEMENT_NODE) {
            chosenChild = childrenEl[i];
            break;
        }
    }

    const page = {
        id1: 'header',
        id2: chosenChild.id
    };

    hideScreen(page);

    const questionPage = document.getElementById('parent-score-container')
    // ig highscore exists update it
    if ((questionPage) && questionPage.style.display === 'none') {
        return updatedScorePage();
    }

    // if highscore page does not exists create it
    const parentScoreContainer = document.createElement('section');
    parentScoreContainer.id = 'parent-score-container';
    const childScoreContainer = document.createElement('section');
    childScoreContainer.id = 'child-score-container';
    parentScoreContainer.appendChild(childScoreContainer);

    // header for highscores page
    const highscoreHeader = document.createElement('h2');
    highscoreHeader.id = 'highscore-header';
    highscoreHeader.innerText = 'Highscores';
    childScoreContainer.appendChild(highscoreHeader);

    const highscoreList = document.createElement('ul');
    highscoreList.id = 'highscore-list'
    childScoreContainer.appendChild(highscoreList);

    const storedHighscore = 'High Score';
    const scores = JSON.parse(localStorage.getItem(storedHighscore));

    // if already highscores store them in list
    if (scores != null) {
        for (let i=0; i < scores.length; i++) {
            let listItem = document.createElement('li');
            listItem.className = 'high-score';
            listItem.textContent = `${scores[i][0]} - ${scores[i][1]}`;
            highscoreList.appendChild(listItem);
        }
    } else {
        // if no highscores display 'No Highscores'
        let listItem = document.createElement('li');
        listItem.className = 'high-score';
        listItem.textContent = `No Highscores!`;
        highscoreList.appendChild(listItem);
    }

    // container for high score button
    const btnContainer = document.createElement('div');
    btnContainer.id = 'highscore-button-container';
    childScoreContainer.appendChild(btnContainer);

    // buttons
    const startQuizAgainBtn = document.createElement('button');
    const clearBtn = document.createElement('button');
    startQuizAgainBtn.className = 'highscore-button';
    clearBtn.className = 'highscore-button';
    startQuizAgainBtn.textContent = 'Start Quiz';
    clearBtn.textContent = 'Clear highscores';
    startQuizAgainBtn.addEventListener('click', startAgain);
    clearBtn.addEventListener('click', clearHighscores);
    btnContainer.appendChild(startQuizAgainBtn);
    btnContainer.appendChild(clearBtn);

    start.appendChild(parentScoreContainer);
    return;
}

