import Pos from "./Position";

const gameOver = (board: Pos[]) => {
  return true;
};

const getBoardStates = (board: Pos[], maxPlayer: boolean) => {
  const boards: Pos[][] = [];
  return boards;
};

export const minimax = (
  board: Pos[],
  depth: number,
  maxPlayer: boolean,
  alpha: number,
  beta: number
) => {
  if (gameOver(board)) {
    if (maxPlayer) return 100 - depth;
    else if (!maxPlayer) return -100 + depth;
    else return 0;
  }
  const boardStates = getBoardStates(board, maxPlayer);

  let completeEval = maxPlayer ? -Infinity : Infinity;
  let boardState;
  for (boardState of boardStates) {
    const boardEval = minimax(boardState, depth + 1, !maxPlayer, alpha, beta);

    if (maxPlayer) {
      completeEval = Math.max(completeEval, boardEval);
      alpha = Math.max(alpha, boardEval);
    } else {
      completeEval = Math.min(completeEval, boardEval);
      beta = Math.min(beta, boardEval);
    }

    if (beta <= alpha) break;
  }

  return completeEval;
};
