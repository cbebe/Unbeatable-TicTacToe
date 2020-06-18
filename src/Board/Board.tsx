import React, { useState, useEffect } from "react";

import "./Board.css";
import BoardCell from "./BoardCell/BoardCell";

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

const emptyStringArray = (length: number) => {
  return Array(length).join(".").split(".");
};

const Board = () => {
  const [cells, setCells] = useState(emptyStringArray(9));
  const [xTurn, setXTurn] = useState(false);
  const [win, setWin] = useState(false);
  const [draw, setDraw] = useState(false);

  const handleCellClick = (idx: number) => {
    setCells(cells => {
      cells[idx] = xTurn ? "x" : "o";
      return cells;
    });
    setXTurn(xTurn => !xTurn);
  };

  const restartGame = () => {
    setWin(false);
    setDraw(false);
    setCells(emptyStringArray(9));
  };

  useEffect(() => {
    const player = !xTurn ? "x" : "o";
    const win = WIN_CONDITIONS.some(combo =>
      combo.every(idx => cells[idx] === player)
    );
    if (win) setWin(true);
    else if (!cells.some(cell => cell === "")) setDraw(true);
  }, [cells, xTurn]);

  return (
    <>
      <div className='main'>
        <div className='grid'>
          {cells.map((cell, i) => (
            <BoardCell key={i} idx={i} onClickEvent={handleCellClick}>
              {cell}
            </BoardCell>
          ))}
        </div>
      </div>
      {win || draw ? (
        <div className='pop-up'>
          {draw ? "Draw!" : `${xTurn ? "o" : "x"} won!`}
          <button onClick={restartGame}>Restart</button>
        </div>
      ) : null}
    </>
  );
};

export default Board;
