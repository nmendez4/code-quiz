// Declared variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goHome = document.querySelector("#goHome");

// Event listener to move to index.html home page to try again
goHome.addEventListener("click", function () {
  window.location.replace("./index.html");
});

// Event listener - clears scores
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

/* © Joshua B. - UNC T.A. */
function compare(a, b) {
  console.log("[A]:", a);
  console.log("[B]:", b);
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
}

// Retreives local stroage and creates #highScore list
var allScores = localStorage.getItem("allScores");
// Converts text to object
allScores = JSON.parse(allScores);
// Sort allScores using sortAlphaNum
allScores.sort(compare);

// Logs unsorted Highscores in consol
console.log(allScores);

if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = document.createElement("li");
    createLi.textContent = allScores[i].initials + " - " + allScores[i].score;
    highScore.appendChild(createLi);
  }
}
