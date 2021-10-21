// Var with array and object for questions + answers
var questions = [
    {
      question:
        "How would you add a .js file to an HTML file?",
      choices: [
       "add via <link> in <head>",
       "add via <div> in <section>",
       "add via <script> in the <body>",
       "add by dragging and dropping",
      ],
      // answer: C
      answer: "add via <script> in the <body>",
    },
    {
      question:
        "What company created and open-sourced 'Bootstrap'?",
      choices: [
        "IBM",
        "Twitter",
        "Microsoft",
        "Apple",
      ],
      // answer: B
      answer: "Twitter",
    },
    {
      question: "What CSS element is know as the 'universal selector'?",
      choices: [
        "* aka the asterisk",
        "# aka the pound sign or hashtag",
        "& aka the ampersand",
        "$ aka the money sign or dollar sign",
      ],
      // answer: A
      answer:
        "* aka the asterisk",
    },
    {
      question: "What does the acronym 'CDN' stand for?",
      choices: [
        "Control Directory Number",
        "Connect Direct Network",
        "Content Delivery Network",
        "Canadian Dairy Network",
      ],
      // answer: C
      answer: "Content Delivery Network",
    },
    {
      question: "How many columns does 'Bootstrap' allow across a webpage?",
      choices: [
        "20 columns",
        "10 columns",
        "15 columns",
        "12 columns",
      ],
      // answer: D
      answer: "12 columns",
    },
];
  // declared variables
  var score = 0;
  var questionIndex = 0;
  var currentTime = document.querySelector("#currentTime");
  var timer = document.querySelector("#startTime");
  var questionsSec = document.querySelector("#questionsSec");
  var wrapper = document.querySelector("#wrapper");
  var secondsLeft = 100;
  // interval time
  var holdInterval = 0;
  // penalty for wrong answer
  var penalty = 10;
  // creates ul
  var ulCreate = document.createElement("ul");
  // button click triggers timer start
  timer.addEventListener("click", function () {
    var x = document.getElementById("startTime");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = "Time: " + secondsLeft;
  
        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          quizCompleted();
          currentTime.textContent = "Your time's up!";
        }
      }, 1000);
    }
    render(questionIndex);
  });
  // questions and answer 
  function render(questionIndex) {
    // Clears existing data
    questionsSec.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
      // Appends question question only
      var userQuestion = questions[questionIndex].question;
      var userChoices = questions[questionIndex].answer;
      questionsSec.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
      var listItem = document.createElement("li");
      listItem.textContent = newItem;
      questionsSec.appendChild(ulCreate);
      ulCreate.appendChild(listItem);
      listItem.addEventListener("click", compare);
    });
  }
  // answer check
  function compare(event) {
    var element = event.target;
  
    if (element.matches("li")) {
      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // right answer if statement
      if (element.textContent == questions[questionIndex].answer) {
        score++;
        createDiv.textContent =
          "Correct! The answer was:  " + questions[questionIndex].answer;
      } else {
        // -10 seconds for wrong selection
        secondsLeft = secondsLeft - penalty;
        createDiv.textContent =
          "Wrong! The correct answer was:  " + questions[questionIndex].answer;
      }
    }
    questionIndex++;
  
    if (questionIndex >= questions.length) {
      // Display Stats
      quizCompleted();
      createDiv.textContent =
        "You answered  " +
        score +
        "/" +
        questions.length +
        " correctly";
    } else {
      render(questionIndex);
    }
  
    questionsSec.appendChild(createDiv);
  }
  
  function quizCompleted() {
    questionsSec.innerHTML = "";
    currentTime.innerHTML = "";
  
    // h1 heading
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Complete!";
  
    questionsSec.appendChild(createH1);
  
    var createQuestionLine = document.createElement("hr");
    createquestionLine.setAttribute("id", "questionline");
  
    questionsSec.appendChild(createQuestionLine);
  
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
  
    questionsSec.appendChild(createP);
  
    // time remaining is score
    if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var createP2 = document.createElement("p");
      clearInterval(holdInterval);
      var calcScore = parseInt(timeRemaining) * parseInt(score);
      createP.textContent = "Your final score is: " + calcScore;
  
      questionsSec.appendChild(createP2);
    }
  
    // enter intials to record score label/box
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
  
    questionsSec.appendChild(createLabel);
  
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.setAttribute("maxlength", "3");
    // placeholder text
    createInput.setAttribute("value", ":>)");
    createInput.setAttribute(
      "onkeypress",
      "return ((event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) || (event.charCode == 32))"
    );
    // clear the current placeholder
    createInput.setAttribute(
      "onfocus",
      "if (this.value == ':>') {this.value = '';}"
    );
  
    createInput.textContent = "";
  
    questionsSec.appendChild(createInput);
  
    // create submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
  
    questionsSec.appendChild(createSubmit);
  
    // event listener for initials & local storage for initials and score
    createSubmit.addEventListener("click", function () {
      var initials = createInput.value;
      if (initials === null) {
        console.log("No value entered!");
      } else {
        var finalScore = {
          initials: initials,
          score: calcScore,
        };
        // adds current quiz taker's score to local list
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
          allScores = [];
        } else {
          allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("./highscores.html");
      }
    });
  }
  