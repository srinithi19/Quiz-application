// selecting dom elements
let list = document.querySelector("#listScores");
let reset = document.getElementById("reset");
let back = document.getElementById("back");
let saveScores = JSON.parse(localStorage.getItem("saveScores")) || [];

//retrieves scores from local storage and creates li's to display them
let displayScore = function () {
  //sorts scores from highest to lowest
  saveScores.sort(function (a, b) {
    return b.score - a.score;
  });
  for (let i = 0; i < saveScores.length; i++) {
    let player = saveScores[i];
    let li = document.createElement("li");
    li.style.marginBottom = "1rem";
    li.textContent = ` ${player.initial}:  ${player.score}`;
    list.appendChild(li);
  }
};

//clears local storage and removes list items
reset.addEventListener("click", function () {
  list.innerHTML = "";
  localStorage.clear();
});

//changes to index.html
back.addEventListener("click", function () {
  location.assign("./index.html");
});

//call function to render scores
displayScore();