var quizQuestions = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Tool Market System",
        b: "Hyper Text Markup Language",
        c: "Hyper Text Mark Learning", 
        d: "Hyper Tool Marketing System",
        answer: "b"
    },
    {
        question: "In what tag does the main content of the webpage belong in?",
        a: "<main>", 
        b: "<section>", 
        c: "<article>", 
        d: "<body>",
        answer: "d"
    },
    {
        question: "How many different heading tags are there?",
        a: "6", 
        b: "10", 
        c: "12", 
        d: "8",
        answer: "a"
    },
    {
        question: "What tag do you use to make an unordered list?",
        a: "<ul>",
        b: "<ol>", 
        c: "<li>", 
        d:"<uli>",
        answer: "a"
    },
    {
        question: "What is the correct syntax to create a hyperlink?",
        a: "<a src=", 
        b: "<a class=", 
        c: "<a href=",
        d: "<a img=",
        answer: "c"
    },
    {
        question: "Who is making the Web standards?",
        a: "Mozilla", 
        b: "Microsoft", 
        c:"Google", 
        d: "The World Wide Web Consortium",
        answer: "d"
    }
];

var startBtn = document.querySelector("#start-btn");
var quizEl = document.querySelector(".quiz-container");
var endEl = document.querySelector(".end");
var scoreEl = document.querySelector(".score");
var scoreTableEl = document.querySelector("#scoretable");
var counter = 0;
var currentscore = 99;
var highScores = [];

var scoreCounter = function() {
    scoreEl.textContent ="Time Remaining: 100"
    
    var scoreInterval = setInterval(function(){
        if(currentscore > 0 && counter < quizQuestions.length){
            scoreEl.textContent = "Time Remaining: " + currentscore;
            currentscore--;
        }else {
            clearInterval(scoreInterval);
            endQuiz();
        }
    }, 1000);
}

var createQuiz = function() {
    document.querySelector("#welcome").remove();
    quizEl.classList.remove("hide");
    
    nextQ(counter);
    scoreCounter();
}

var nextQ = function(index){
    var qheader = document.querySelector(".qheader");
    var questionEl = document.querySelector(".questions");
    var btna = document.getElementById("btn-a");
    var btnb = document.getElementById("btn-b");
    var btnc = document.getElementById("btn-c");
    var btnd = document.getElementById("btn-d");

    qheader.textContent = "Qestion #" + parseInt(index + 1);
    questionEl.textContent = quizQuestions[index].question;
    btna.textContent = quizQuestions[index].a;
    btnb.textContent = quizQuestions[index].b;
    btnc.textContent = quizQuestions[index].c;
    btnd.textContent = quizQuestions[index].d;

    btna.addEventListener("click", checkAnswer);
    btnb.addEventListener("click", checkAnswer);
    btnc.addEventListener("click", checkAnswer);
    btnd.addEventListener("click", checkAnswer);
}

var checkAnswer = function(event) {
    var clickedBtn = event.target.getAttribute("value");
    var feedbackEl = document.querySelector(".feedback");
    feedbackEl.classList.remove("hide");

    if(clickedBtn === quizQuestions[counter].answer){
        
        feedbackEl.textContent = "Correct Answer!";
    }else{
        if(currentscore>=5){
            currentscore-= 5;
            scoreEl.textContent ="Time Remaining: " + currentscore;
        }
    feedbackEl.classList.remove("hide");
    feedbackEl.textContent = "Incorrect Answer!";
    }
    counter++;
    
    if(counter < quizQuestions.length){
        nextQ(counter);
    }else{
        feedbackEl.remove();
        endQuiz();
    }
}

var endQuiz = function(){
    quizEl.remove();
    scoreEl.remove();

    endEl.innerHTML = "<h2 class='end-title'>That's all she wrote!</h2><p>Your final score is " + currentscore + ". Please enter your name.</p>";

    var scoreForm = document.createElement("form");
    scoreForm.id = "score-form";
    endEl.appendChild(scoreForm);

    var name = document.createElement("input");
    name.className = "name-input";
    name.setAttribute("name", "player-name");
    name.setAttribute("placeholder", "Enter Your Name");
    scoreForm.appendChild(name);

    var namebutton = document.createElement("BUTTON");
    namebutton.className = "btn";
    namebutton.id =  "name-btn";
    namebutton.textContent = "SUBMIT";
    scoreForm.appendChild(namebutton);

    namebutton.addEventListener("click", saveScore);
}

var saveScore = function() {
    event.preventDefault();
    var playerName = document.querySelector("input[name='player-name']").value;

    if(!playerName){
        alert("Please enter your name!")
    }else{
        var scoreObj = {
            name: playerName,
            score: currentscore
        }

        highScores.push(scoreObj);
        document.querySelector("#score-form").reset();
        localStorage.setItem("scores", JSON.stringify(highScores));
    }
}


startBtn.addEventListener("click", createQuiz);
