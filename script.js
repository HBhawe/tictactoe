// REMAINING - refactor code to work with user submitted player names

// QUERY SELECTORS
const gameGrid = document.querySelectorAll(".game-grid");
const currentPlayerHeading = document.querySelector(".current-player");
const body = document.querySelector("body");
const reloadButton = document.querySelector(".reload-button");
const winnerPlayer = document.querySelector(".winner-player");

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

// EVENT LISTENERS

player1.addEventListener("change", (e) => {
  players.currentPlayer = player1.value;
});

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
  const arrayGenerator = function (length) {
    let array = new Array(length);
    for (let index = 0; index < array.length; index++) {
      array[index] = Math.random();
    }
    return array;
  };

  // const gameState = new Array(9);
  const gameState = arrayGenerator(9);

  const makeMove = function (event, marker, position) {
    gameState[position] = marker;
    renderBoard(event, marker);
    checkWinner();
  };

  //   private method
  const renderBoard = function (event, marker) {
    event.target.insertAdjacentText("beforeend", marker);
    currentPlayerHeading.innerText = `${players.currentPlayer}`;
  };

  const onLoadRender = function () {
    currentPlayerHeading.innerText = "player1";
    winnerPlayer.innerText = "";
  };

  const reloadGame = function () {
    // gameState.splice(0, gameState.length);
    for (let index = 0; index < gameState.length; index++) {
      gameState[index] = Math.random();
    }

    gameGrid.forEach((grid) => {
      grid.innerText = "";
    });
    onLoadRender();
  };

  const checkWinner = function () {
    let winnerRows = checkWinnerRows();
    let winnerColumns = checkWinnerColumns();
    let winnerDiagonals = checkWinnerDiagonals();
    // if (!winnerRows && !winnerColumns && !winnerDiagonals) {
    //   winnerPlayer.innerText = `Tie! Please reload and start again!`;
    // }
  };

  const checkWinnerRows = function () {
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else if (gameState[3] === gameState[4] && gameState[3] === gameState[5]) {
      let marker = gameState[3];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else if (gameState[6] === gameState[7] && gameState[6] === gameState[8]) {
      let marker = gameState[6];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else return 0;
  };
  const checkWinnerColumns = function () {
    if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else if (gameState[1] === gameState[4] && gameState[1] === gameState[7]) {
      let marker = gameState[1];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else if (gameState[2] === gameState[5] && gameState[2] === gameState[8]) {
      let marker = gameState[2];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else return 0;
  };
  const checkWinnerDiagonals = function () {
    if (gameState[0] === gameState[4] && gameState[0] === gameState[8]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else if (gameState[2] === gameState[4] && gameState[2] === gameState[6]) {
      let marker = gameState[2];
      let winner = marker === "X" ? "Player 1" : "Player 2";
      winnerPlayer.innerText = `${winner} wins!`;
    } else return 0;
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
