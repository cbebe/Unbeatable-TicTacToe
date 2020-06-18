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

  const handleCellClick = (idx: number) => {
    setCells(cells => {
      cells[idx] = xTurn ? "x" : "o";
      return cells;
    });
    setXTurn(xTurn => !xTurn);
  };

  useEffect(() => {
    const player = !xTurn ? "x" : "o";
    const win = WIN_CONDITIONS.some(combo =>
      combo.every(idx => cells[idx] === player)
    );
    if (win) {
    }
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
      <div></div>
    </>
  );
};

export default Board;
