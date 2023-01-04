// Define a set of questions 
const questions = [
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. curly brackets", "c. quotes", "d. parenthesis"],
        answer: "c. quotes"
    },
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c. alerts"
    },
    {
        question: "How do you create a function in JavaScript",
        choices: ["a. function = myFunction()", "b. function myFunction()", "c. function:myFunction()", "d. createMyFunction()"],
        answer: "b. function myFunction()"
    },
    {
        question: "The first index of an array is ____.",
        choices: ["a. 0", "b. 1", "c. 8", "d. any"],
        answer: "a. 0"
    },
    {
        question: "How do you add a comment in a JavaScript?",
        choices: ["a. //This is a comment", "b. <!--This is a comment-->", "c. 'This is a comment", "d. * This is a comment *"],
        answer: "a. //This is a comment"
    },
    {
        question: "Which event occurs when the user presses a keyboard key?",
        choices: ["a. onclick", "b. keydown", "c. keyup", "d. onmouseclick"],
        answer: "b. keydown"
    },
    {
        question: "Which event occurs when the user releases a keyboard key?",
        choices: ["a. onclick", "b. keydown", "c. keyup", "d. onmouseclick"],
        answer: "c. keyup"
    },
    {
        question: "Arrays in javascript is used to store _____",
        choices: ["a. other arrays", "b. variables", "c. objects", "d. all the above"],
        answer: "d. all the above"
    }
];

// store html elements
let startButton = document.querySelector("#start");
let info = document.querySelector(".info");
let timeEL = document.querySelector(".timer");
let questionEl = document.createElement("section");
let head = document.querySelector("header");
let result = document.querySelector("#result");
let ptext = document.querySelector("#text");
let save = document.querySelector("#save");
let initialEl = document.querySelector("#initials");
let highscores = document.getElementById("highscore");




// global variables
let timeLeft = 60;
let curQnIndex;
let correctAns = 0;
let score = 0;
let saveScores = JSON.parse(localStorage.getItem("saveScores")) || [];



//function to start quiz and timer
let startQuiz = function () {
    info.classList.add("hide");
    curQnIndex = 0;
    let startTimer = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
        }
        timeEL.textContent = "Time: " + timeLeft;
        if (timeLeft <= 0 || curQnIndex === questions.length) {
            timeEL.textContent = "";
            clearInterval(startTimer);
            endGame();
        }
    }, 1000);
    //function to display questions
    nextQuestion(questions[curQnIndex]);
}

// Dynamically generates html elements to display question and answer
let nextQuestion = function (questions) {
    questionEl.textContent = questions.question;
    questionEl.classList.add("qncontainer");
    head.appendChild(questionEl);
    questions.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.classList.add("answerBtn");
        button.innerText = choice;
        questionEl.appendChild(button);
        button.addEventListener("click", checkAnswer);
    });
};


//function to check answer and increment score if answer is correct or decrement timer by 10secs fro wrong answer
function checkAnswer(e) {
    let userAnswer = e.target.innerText;
    const answer = questions[curQnIndex].answer;
    if (userAnswer === answer) {
        correctAns++;
        e.target.classList.add("valid");  
        //alert("Thats correct!!")
        curQnIndex++;
    } else {
        timeLeft -= 10;
        if (timeLeft <= 0) {
            timeLeft = 0;
        }
        e.target.classList.add("invalid");
        //alert("Thats wrong. Correct answer is "+ answer);
        curQnIndex++;  
    }
    if (curQnIndex < questions.length) {
        setTimeout(function(){
            nextQuestion(questions[curQnIndex])}
            ,500);
    }
}


//stops the quiz znd print the score
function endGame() {
    questionEl.classList.add("hide");
    result.classList.remove("hide");
    ptext.innerHTML = `<strong>Your final score is ${(correctAns * 10)}</strong>`;
    saveScore();
}

function saveScore() {
    save.addEventListener("click", function (e) {
        e.preventDefault();
        userInitial = initialEl.value;
        if (userInitial === "") {
          alert("Please Enter Initial");
          return;
        }
    
        result.classList.add("hide");
        //object for holding user initial and score
        let scoreObj = {
          initial: userInitial,
          score: correctAns * 10
        };
        //saving to local storage after pushing object to saveScores array
        saveScores.push(scoreObj);
        localStorage.setItem("saveScores", JSON.stringify(saveScores));
        //changes location to highscores.html to display scores
        location.assign("./highscores.html");
      });   
}

// on click of view highscore button, displays highscores.html
highscores.addEventListener("click", function () {
    location.assign("./highscores.html");
  });

// event to be happened on click of "start" button
startButton.addEventListener("click", startQuiz);

