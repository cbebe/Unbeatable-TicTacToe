import React from "react";

import "./BoardCell.css";
interface Props {
  idx: number;
  children: string;
  onClickEvent: (idx: number) => void;
}

const BoardCell = (props: Props) => {
  const { idx, children, onClickEvent } = props;

  const handleClick = () => {
    if (children !== "") return;
    onClickEvent(idx);
  };

  return (
    <div className='board-cell' onClick={() => handleClick()}>
      {children}
    </div>
  );
};

export default BoardCell;
