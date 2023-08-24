const tiles = document.querySelectorAll(".tile");
const PLAYER_X = "X";
const PLAYER_O = "O";
let turn = PLAYER_X;

const boardState = Array(tiles.length);
boardState.fill(null);

//Elements
const strike = document.getElementById("strike");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

//Sounds
const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");

tiles.forEach((tile) => tile.addEventListener("click", tileClick));



function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }

  if (turn === PLAYER_X) {
    tile.innerText = PLAYER_X;
    boardState[tileNumber - 1] = PLAYER_X;
    turn = PLAYER_O;
  } else {
    tile.innerText = PLAYER_O;
    boardState[tileNumber - 1] = PLAYER_O;
    turn = PLAYER_X;
  }

  clickSound.play();
  checkWinner();
}

function checkWinner() {
  //Check for a winner
  for (const winningCombination of winningCombinations) {
    //Object Destructuring
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  //Check for a draw
  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is player ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
  gameOverSound.play();
}

function startNewGame() {
  strike.className = "strike";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = PLAYER_X;
}
//way of line to win
const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
