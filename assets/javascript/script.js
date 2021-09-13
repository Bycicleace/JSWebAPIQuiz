/* TO DO
 X | Set CSS to match styles
 X | Create Questions (Collection of Objects)
 X | Create Timer function
 X | Create "Wrong" and "Correct" functions for footer
 X | Create loadQuestion function
 X | Add functionality for when the timer reaches 0.
   | Design High Score page
   | Add functionality to High Score buttons.
   | Add functionality to "View high scores" link
*/

// Global variables
var timerAmount = 0;
var totalQuestions = questionsArray.length;
var questionIndex = 0;
var timer;
var highScores = [];
/*
    Set this to different pages to eventually move back to. Possible values:
        Start
*/
var lastPage = "start";

// Loads the question at the index provided.
var LoadQuestion = function(index) {
    // Sets lastPage to questionIndex
    lastPage = String(questionIndex);

    // Changes main-title to question
    var mainTitle = document.querySelector("#main-title h2");
    mainTitle.textContent = questionsArray[index].question;
    mainTitle.setAttribute("style","text-align: left;");

    // Changes main-subtitle to list of buttons, answers
    var mainSubtitle = document.querySelector("#main-subtitle");
    mainSubtitle.innerHTML = "";
    mainSubtitle.setAttribute("style", "text-align: left;");

    // Add even to clear footer when mouse moves
    mainSubtitle.addEventListener('mousemove',ClearFooter);

    for (var i = 0; i < Object.keys(questionsArray[index].answers).length; i++) {
        // Create answer button wrapper.
        var answerDiv = document.createElement("div");
        answerDiv.className = "answerDiv";

        // Create answer button.
        var answerButton = document.createElement("button");
        answerButton.className = "answer";
        answerButton.textContent = i + 1 + ". " + questionsArray[index].answers[i + 1].answer;

        // Call CorrectAnswer if it's right, IncorrectAnswer if it's wrong.
        if (questionsArray[index].answers[i + 1].isCorrect === true) {
            answerButton.addEventListener('click',CorrectAnswer);
        } else if (questionsArray[index].answers[i + 1].isCorrect === false){
            answerButton.addEventListener('click',IncorrectAnswer);
        }
        
        // Put button in div
        answerDiv.appendChild(answerButton);

        // append div to main-subtitle
        mainSubtitle.appendChild(answerDiv);
    }

    // clears out main-button
    var mainButton = document.querySelector("#main-button");
    if (mainButton) {
        mainButton.innerHTML = "";
    }
};

var StartTimer = function(amountOfSeconds) {
    timerAmount = amountOfSeconds;
    var timerElement = document.querySelector("#timer h2 span");
    timerElement.textContent = timerAmount;
    timer = setInterval(function(){
        timerAmount--;
        timerElement.textContent = timerAmount;
        if (parseInt(timerAmount) <= 0) {
            clearInterval(timer);
            GameOver();
        }
    }, 1000);
};

var GameOver = function() {
    // Stop Timer if it's running
    clearInterval(timer);

    // Set lastPage for the Go Back button
    lastPage = "game-over";

    // Set game over screen.
    var mainTitle = document.querySelector("#main-title h2");
    mainTitle.textContent = "All done!";
    
    // Clear subtitle section
    var mainSubtile = document.querySelector("#main-subtitle");
    mainSubtile.innerHTML = "";

    // Set subtitle section to current score
    var subDiv = document.createElement("div");
    subDiv.className = "alignLeft noPadding";
    var subP = document.createElement("p");
    subP.textContent = "Your final score is " + timerAmount;
    subDiv.appendChild(subP);
    mainSubtile.appendChild(subDiv);

    // Use the main-button section for the Initial entry
    var mainButton = document.querySelector("#main-button");

    // Create a form to store the three elements
    var form = document.createElement("form");

    var labelInitials = document.createElement("label");
    labelInitials.setAttribute("for", "textInitials");
    labelInitials.textContent = "Enter initials:";

    var textInitials = document.createElement("input");
    textInitials.setAttribute("type", "text");
    textInitials.setAttribute("id", "textInitials");
    textInitials.setAttribute("name", "textInitials");

    var submitButton = document.createElement("submit");
    submitButton.className = "button";
    submitButton.textContent = "Submit";
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        AddScore();
    });

    form.appendChild(labelInitials);
    form.appendChild(textInitials);
    form.appendChild(submitButton);
    mainSubtile.appendChild(form);

    // Clear out button area if present (bug from Go Back at this screen)
    var mainButton = document.querySelector("#main-button");
    mainButton.innerHTML = "";
};

var CorrectAnswer = function() {
    // Change Footer
    var footer = document.querySelector("footer");
    var footerDiv = document.createElement("div");
    var footerLabel = document.createElement("h2");
    footerLabel.textContent = "Correct!";

    footer.innerHTML = ""

    footerDiv.appendChild(footerLabel);
    footer.appendChild(footerDiv);

    NextQuestion();
};

var IncorrectAnswer = function() {
    // Change Footer
    var footer = document.querySelector("footer");
    var footerDiv = document.createElement("div");
    var footerLabel = document.createElement("h2");
    footerLabel.textContent = "Wrong!";

    footer.innerHTML = ""

    footerDiv.appendChild(footerLabel);
    footer.appendChild(footerDiv);

    // decrement Timer (Check for < 0)
    var timerElement = document.querySelector("#timer h2 span");
    timerAmount -= 10;
    if (timerAmount < 0) {
        clearInterval(timer);
        timerAmount = 0;
        timerElement.textContent = timerAmount;
        GameOver();
    } else {
        timerElement.textContent = timerAmount;
        NextQuestion();
    }
};

var MainHandler = function() {
    timerAmount = 100;
    StartTimer(timerAmount);
    LoadQuestion(questionIndex);
    questionIndex++;
};

var NextQuestion = function() {
    if (questionIndex >= totalQuestions) {
        GameOver();
    } else {
        LoadQuestion(questionIndex);
        questionIndex++;
    }
};

var ClearFooter = function() {
    var footer = document.querySelector("footer");
    footer.innerHTML = ""
};

var GetHighScores = function() {
    // Get high score from local memory. If there is none, then make it blank
    var stringHighScores = localStorage.getItem("highScores");
    if (!(stringHighScores === null)) {
        highScores = JSON.parse(stringHighScores);
    } else {
        highScores = [];
    }
};

var SetHighScores = function() {
    // Stringify high scores array and store it in local memory
    var stringHighScores = JSON.stringify(highScores);
    localStorage.setItem("highScores", stringHighScores);
};

var SortHighScores = function() {
    highScores = highScores.sort(function(x, y) {
        return y.score - x.score;
    });
};

var DisplayHighScores = function() {
    // Change main-title to be "High scores"
    var mainTitle = document.querySelector("#main-title h2");
    mainTitle.textContent = "High scores";
    mainTitle.className = "alignLeft";

    // Change main-subtitle to be list of high scores"
    var mainSubtitle = document.querySelector("#main-subtitle");
    mainSubtitle.innerHTML = "";

    for (var i = 0; i < highScores.length; i++) {
        var highScoreRowDiv = document.createElement("div");
        if ((i % 2) == 0) {
            // index is even
            highScoreRowDiv.className = "odd highScoreDiv";
        } else {
            // index is odd
            highScoreRowDiv.className = "even highScoreDiv";
        }

        var highScoreRowP = document.createElement("p");
        highScoreRowP.textContent = String((i + 1)) + ". " + highScores[i].name + " - " + highScores[i].score

        highScoreRowDiv.appendChild(highScoreRowP);
        mainSubtitle.appendChild(highScoreRowDiv);
    }

    // Change main-button to house "Go back" and "Clear high scores" buttons
    var mainButton = document.querySelector("#main-button");
    mainButton.innerHTML = "";

    var buttonDiv = document.createElement("div");
    buttonDiv.className = "alignLeft highScoreButtonDiv";
    
    var buttonGoBack = document.createElement("button");
    buttonGoBack.textContent = "Go back";
    buttonGoBack.className = "button highScoreButton";
    buttonGoBack.addEventListener("click", LoadLastScreen);

    var buttonClearScores = document.createElement("button");
    buttonClearScores.textContent = "Clear high scores";
    buttonClearScores.className = "button highScoreButton";
    buttonClearScores.addEventListener('click', function() {
        highScores = [];
        SetHighScores();
        DisplayHighScores();
    });

    buttonDiv.appendChild(buttonGoBack);
    buttonDiv.appendChild(buttonClearScores);
    mainButton.appendChild(buttonDiv);
}

var LoadLastScreen = function() {
    if (lastPage === "start") {
        // Reloads the page.
        location.reload();
    } else if (lastPage === "game-over") {
        // Goes back to Game Over screen.
        GameOver();
    } else if (parseInt(lastPage)) {
        // Loads the question of that page.
        questionIndex = lastPage;
        NextQuestion(parseInt(lastPage));
    } else {
        // Not sure what is there, so reload.
        location.reload();
    }
}

var AddScore = function() {
    var highScoreText = document.querySelector("#textInitials");
    if (highScoreText.value === "") {
        alert("You must enter your initials");
    } else {
        highScores.push({name: highScoreText.value, score: timerAmount});
        SortHighScores();
        SetHighScores();
        DisplayHighScores();
        lastPage = "start";
    }
}

// Disable 'Enter' key functionality
document.addEventListener('keydown', function(event) {
    var code = event.code;
    if (code === "Enter") {
        event.preventDefault();
        var form = document.querySelector("form");
        if (!(form === null)) {
            AddScore();
        }
    }
})

GetHighScores();

var buttonStart = document.querySelector("#main-button button");
buttonStart.addEventListener("click", MainHandler);