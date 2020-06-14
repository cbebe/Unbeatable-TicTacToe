"use strict";
const X_CLASS = "x";
const O_CLASS = "o";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const cellElements = Array.from(document.querySelectorAll("[data-cell]"));
const board = document.getElementById("board");
const winMsgElement = document.getElementById("winningMessage");
const winMsgTextElement = (document.querySelector("[data-winning-message-text]"));
const restartButton = document.getElementById("restartButton");
const reset = document.getElementById("reset");
restartButton.addEventListener("click", startGame);
reset.addEventListener("click", startGame);
let oTurn;
startGame();
function startGame() {
    oTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winMsgElement.classList.remove("show");
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    // placeMark
    cell.classList.add(currentClass);
    // instead of switching turns, add
    if (checkWin(currentClass))
        endGame(false);
    else if (isDraw())
        endGame(true);
    else {
        oTurn = !oTurn;
        setBoardHoverClass();
    }
}
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (oTurn)
        board.classList.add(O_CLASS);
    else
        board.classList.add(X_CLASS);
}
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => combination.every((index) => cellElements[index].classList.contains(currentClass)));
}
function isDraw() {
    return [...cellElements].every((cell) => cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS));
}
function endGame(draw) {
    if (draw)
        winMsgTextElement.innerText = "Draw!";
    else
        winMsgTextElement.innerText = `${oTurn ? "O" : "X"} Wins!`;
    winMsgElement.classList.add("show");
}
