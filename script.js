/*
TO-DO
1. refactor code to work with user-submitted player names and symbols
2. tie games
*/

// QUERY SELECTORS
"use strict";

const gameGrid = document.querySelectorAll(".game-grid");
const currentPlayerHeading = document.querySelector(".current-player");
const body = document.querySelector("body");
const reloadButton = document.querySelector(".reload-button");
const winnerPlayer = document.querySelector(".winner-player");
const formSubmit = document.querySelector(".players");
const submitButton = document.querySelector(".submit-button");
const container = document.querySelector("#container");

// EVENT LISTENERS
// hide the grid until the form is submitted
body.addEventListener("DOMContentLoaded", container.classList.add("hidden"));

// event listener for click events on the grid
gameGrid.forEach((grid) =>
  grid.addEventListener("click", (e) => {
    let player = players.currentPlayer;
    let currentPlayerName = players.playerObject[player];
    // console.log(currentPlayerName);
    let currentMarker = players.playerObject[`${player}symbol`];
    let positon = e.target.dataset.id;
    console.log(players.playerArray);
    if (!e.target.innerText) {
      players.currentPlayer = player === "player1" ? "player2" : "player1";
      players.playerArray.push(players.playerObject[players.currentPlayer]);
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
    currentPlayerHeading.innerText = `${players.playerArray[players.playerArray.length - 1]}`;
  };

  const onLoadRender = function (player1) {
    currentPlayerHeading.innerText = `${player1}`;
    winnerPlayer.innerText = "";
    formSubmit.reset();
    formSubmit.classList.add("hidden");
  };

  const reloadGame = function () {
    window.location.reload();
  };

  const checkWinner = function () {
    let winnerRows = checkWinnerRows();
    let winnerColumns = checkWinnerColumns();
    let winnerDiagonals = checkWinnerDiagonals();
    if (
      !winnerColumns &&
      !winnerRows &&
      !winnerDiagonals &&
      players.playerArray.length > 7
    ) {
      winnerPlayer.innerText = `Draw`;
    }
  };

  const checkWinnerRows = function () {
    if (gameState[0] === gameState[1] && gameState[0] === gameState[2]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else if (gameState[3] === gameState[4] && gameState[3] === gameState[5]) {
      let marker = gameState[3];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else if (gameState[6] === gameState[7] && gameState[6] === gameState[8]) {
      let marker = gameState[6];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else return 0;
  };
  const checkWinnerColumns = function () {
    if (gameState[0] === gameState[3] && gameState[0] === gameState[6]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else if (gameState[1] === gameState[4] && gameState[1] === gameState[7]) {
      let marker = gameState[1];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else if (gameState[2] === gameState[5] && gameState[2] === gameState[8]) {
      let marker = gameState[2];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else return 0;
  };
  const checkWinnerDiagonals = function () {
    if (gameState[0] === gameState[4] && gameState[0] === gameState[8]) {
      let marker = gameState[0];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else if (gameState[2] === gameState[4] && gameState[2] === gameState[6]) {
      let marker = gameState[2];
      let winner = marker === "X" ? "player1" : "player2";
      winnerPlayer.innerText = `${players.playerObject[winner]} wins!`;
    } else return 0;
  };

  return { gameState, makeMove, onLoadRender, reloadGame };
})();

// PLAYER IIFE
const players = (function () {
  const playerObject = new Object();
  playerObject.player1symbol = "X";
  playerObject.player2symbol = "O";
  const playerArray = new Array();
  let currentPlayer = "player1";
  return { playerObject, playerArray, currentPlayer };
})();

formSubmit.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formSubmit, submitButton);
  const playerObject = {};
  for (const [key, value] of formData) {
    playerObject[key] = value;
    players.playerObject[key] = value;
  }
  let player1 = players.playerObject.player1;
  players.playerArray.push(player1);
  container.classList.remove("hidden");
  gameBoard.onLoadRender(player1);
});
