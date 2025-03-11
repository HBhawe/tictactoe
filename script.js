// QUERY SELECTORS
const gameGrid = document.querySelectorAll(".game-grid");
const currentPlayerHeading = document.querySelector(".current-player");
const body = document.querySelector("body");
const reloadButton = document.querySelector(".reload-button");

// EVENT LISTENERS

// event listener for click events on the grid
gameGrid.forEach((grid) =>
  grid.addEventListener("click", (e) => {
    let player = players.currentPlayer;
    let currentMarker = players[`${player}Marker`];
    let positon = e.target.dataset.id;
    if (!e.target.innerText) {
      players.currentPlayer = player === "player1" ? "player2" : "player1";
      gameBoard.makeMove(e, currentMarker, positon);
    }
  })
);

// reload gameBoard
reloadButton.addEventListener("click", (e) => {
  gameBoard.reloadGame();
});

// GAMEBOARD IIFE
const gameBoard = (function () {
  const gameState = new Array(9);
  const makeMove = function (event, marker, position) {
    gameState[position] = marker;
    renderBoard(event, marker);
  };

  //   private method
  const renderBoard = function (event, marker) {
    event.target.insertAdjacentText("beforeend", marker);
    currentPlayerHeading.innerText = `${players.currentPlayer}`;
  };

  const onLoadRender = function () {
    currentPlayerHeading.innerText = "player1";
  };

  const reloadGame = function () {
    gameState.splice(0, gameState.length);
    gameGrid.forEach((grid) => {
      grid.innerText = "";
    });
    onLoadRender();
  };

  return { gameState, makeMove, onLoadRender, reloadGame };
})();

// PLAYER IIFE
const players = (function () {
  const player1Marker = "X";
  const player2Marker = "O";
  let currentPlayer = "player1";

  return { player1Marker, player2Marker, currentPlayer };
})();

// event listener to set player1 up when starting
body.addEventListener("load", gameBoard.onLoadRender());
