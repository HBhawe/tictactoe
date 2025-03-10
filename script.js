// GAMEBOARD IIFE
const gameBoard = (function () {
  const gameState = new Array(9);
  const makeMove = function (marker, position) {
    gameState[position] = marker;
    renderBoard();
  };

  //   private method
  const renderBoard = function (gameState) {
    console.log(`rendered`);
  };
  return { gameState, makeMove };
})();

// PLAYER IIFE
const players = (function () {
  const player1 = new Array(9);
  const player2 = new Array(9);
  const player1Marker = "X";
  const player2Marker = "O";

  return { player1, player2, player1Marker, player2Marker };
})();

console.log(gameBoard.gameState);
gameBoard.makeMove("x", 2);
console.log(gameBoard.gameState);

// QUERY SELECTORS
const gameGrid = document.querySelectorAll(".game-grid");

// EVENT LISTENERS
gameGrid.forEach((grid) =>
  grid.addEventListener("click", (e) => {
    console.log(e.target, e.target.dataset.id);
  })
);
