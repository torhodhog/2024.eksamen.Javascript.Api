// In your JavaScript file
window.onload = function () {
  let rulesDiv = document.getElementById("rules");
  let startGameButton = document.getElementById("start-game");

  startGameButton.addEventListener("click", function () {
    rulesDiv.style.display = "none";
  });
};

