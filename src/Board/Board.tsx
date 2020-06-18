import React, { useState, useEffect } from "react";

import "./Board.css";
import BoardCell from "./BoardCell/BoardCell";
import Pos from "../Minimax/Position";

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const emptyBoard = () => {
  const board = [];
  for (let i = 0; i < 9; i++) board.push(Pos.blank);
  return board;
};

const Board = () => {
  const [cells, setCells] = useState(emptyBoard());
  const [playerTurn, setPlayerTurn] = useState(false);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);

  const handleCellClick = (idx: number) => {
    setCells(cells => {
      cells[idx] = playerTurn ? Pos.player : Pos.bot;
      return cells;
    });
    setPlayerTurn(xTurn => !xTurn);
  };

  const restartGame = () => {
    setWin(false);
    setDraw(false);
    setCells(emptyBoard());
  };

  useEffect(() => {
    const player = !playerTurn ? Pos.player : Pos.bot;
    const win = WIN_CONDITIONS.some(combo =>
      combo.every(idx => cells[idx] === player)
    );
    if (win) setWin(true);
    else if (!cells.some(cell => cell === Pos.blank)) setDraw(true);
  }, [cells, playerTurn]);

  return (
    <>
      <div className='main'>
        <div className='grid'>
          {cells.map((cell, i) => (
            <BoardCell key={i} idx={i} onClickEvent={handleCellClick}>
              {cell === Pos.blank ? "" : cell === Pos.player ? "x" : "o"}
            </BoardCell>
          ))}
        </div>
      </div>
      {win || draw ? (
        <div className='pop-up'>
          {draw ? "Draw!" : `${playerTurn ? "o" : "x"} won!`}
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : null}
    </>
  );
};

export default Board;
