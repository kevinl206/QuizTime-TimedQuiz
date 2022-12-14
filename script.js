// this is when user click on the the button to start the game
const startButton = document.getElementById("start-btn");
// this will grab the containers with question and answers.
const questionContainerElement = document.getElementById("question-container");
const questionElement  = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

//Initials Form Submit button for local storage
var submitBtn = document.getElementById("submit");
var container1 = document.getElementsByClassName("container1");
var correctIncorrectEl = document.getElementById("correct-incorrect-text");
 const nextButton = document.getElementById("next-btn");
//timer element. with a 30 sec left
var timerEl = document.getElementById("timer-seconds");
var secondsLeft = 30;
var score = 0;
const initialsEl = document.getElementById("initialform");

// shuffle question in randoms
let shuffledQuestions, questionIndex;


startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    questionIndex++;
    setNextQuestion();
})
// this function is used when user clicks on the start button. Once the user click on the button it will hide that start button and then it will show our questions.
function startGame() {
    console.log("Started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    questionIndex = 0;
    questionContainerElement.classList.remove("hide");    
    setNextQuestion();
}



function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[questionIndex]);

}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
//reset
function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}


    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        
        if (shuffledQuestions.length > questionIndex + 1) {
            nextButton.classList.remove("hide");
        } else {
            startButton.innerText = "Restart"
            startButton.classList.remove("hide");
    
        }
        
    }

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");

}


const questions = [
    {
        question: "[Bonus] who is Billie Jeans that Michael Jackson was singing about on his hit song 'Billie Jeans?'",
        answers: [
            { text: "Levis Jeans", correct: false },
            { text: "Jean Jacket", correct: false },
            { text: "Canadian Tuxedo", correct: false },
            { text: "A girl who claims that he is the one", correct: true },
        ]
    },
    {
        question: "What are opening and close tags for HTML?",
        answers: [
            { text: "{ }, {/}", correct: false },
            { text: "[ ], [?]", correct: false },
            { text: "< >, </>", correct: true },
            { text: "( ), (/)", correct: false },
        ]
    },
    {
        question: "What is the significance of <head> tags?",
        answers: [
            { text: "tag provides the information about the document", correct: true },
            { text: "tag defines the body of the HTML document", correct: false },
            { text: "tags stands for bold and italic", correct: false },
            { text: "tags represent that the span of text is of strong importance", correct: false },
        ]
    },
    {
        question: "What are the difference between “ == “ and “ === “ operators",
        answers: [
            { text: "the difference between both the operators is that == is a 'loop' and === is an 'array", correct: false },
            { text: "the difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.", correct: true },
            { text: "the difference between both the operators is that == 'null' and === is 'string'", correct: false },
            { text: "the difference between both the operators is that == is 'universal' and === is a 'string'", correct: false },
        ]
    },
    {
        question: "What is NaN property in JavaScript?",
        answers: [
            { text: "NaN property represents the “Not-a-Number” value. It indicates a value that is not a legal number", correct: true },
            { text: "a flatbread that is a staple food in Southeast and Central Asia.", correct: false },
            { text: "a function that will be executed after another function gets executed", correct: false },
            { text: "mistakes or spelling problems in the code that cause the program to not execute at all or to stop running halfway through.", correct: false },
        ]
    }
];
// 30 second timer
var timerInterval = setInterval(function() {
    timerEl.innerHTML=secondsLeft + " seconds left until melt down!!!";
    if(secondsLeft === 0){
        clearInterval(timerInterval); 
        timerEl.innerHTML = "Time is up";
        initialsEl.classList.remove('hide-form');
        questionContainerElement.classList.add('hide');
    }
    secondsLeft--;
},1500);

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    //Initials Text Value
    const initialsText = document.getElementById("initialsText").value;
    localStorage.setItem("initialsText", initialsText);
    console.log(initialsText);
});
