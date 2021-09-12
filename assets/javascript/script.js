console.log("Script loaded.");

/* TO DO
 X | Set CSS to match styles
 X | Create Questions (Collection of Objects)
   | Create Timer function
   | Create "Wrong" and "Correct" functions for footer
   | Create loadQuestion function
   | Create quizComplete function for when someone answers all questions
   | Add functionality for when the timer reaches 0.
   | Create scoring function to store score
   | Design High Score page
   | Add functionality to High Score buttons.
   | Add functionality to "View high scores" link
*/

console.log(questionsArray);

// Loads the question at the index provided.
var LoadQuestion = function(index) {
    // Changes main-title to question
    var mainTitle = document.querySelector("#main-title h2");
    mainTitle.textContent = questionsArray[index].question;
    mainTitle.setAttribute("style","text-align: left;");

    // Changes main-subtitle to list of buttons, answers
    var mainSubtitle = document.querySelector("#main-subtitle");
    mainSubtitle.innerHTML = "";
    mainSubtitle.setAttribute("style", "text-align: left;");

    for (var i = 0; i < Object.keys(questionsArray[index].answers).length; i++) {
        // Create answer button wrapper.
        var answerDiv = document.createElement("div");
        answerDiv.className = "answerDiv";

        // Create answer button.
        var answerButton = document.createElement("button");
        answerButton.className = "answer";
        answerButton.textContent = i + 1 + ". " + questionsArray[index].answers[i + 1].answer;
        
        // Put button in div
        answerDiv.appendChild(answerButton);

        // append div to main-subtitle
        mainSubtitle.appendChild(answerDiv);
    }

    // clears out main-button
    var mainButton = document.querySelector("#main-button");
    if (mainButton) {
        mainButton.remove();
    }
}

