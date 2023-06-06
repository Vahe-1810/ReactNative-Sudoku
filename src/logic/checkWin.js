import { checkDuplicates } from "./checkDupls";

export const checkWin = (board) => {
  if (!checkDuplicates(board).length) {
    const complitedCount = [];
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cube = board[i][j];
        if (cube !== 0) complitedCount.push(cube);
      }
    }
    if (complitedCount.length === board.length * board[0].length) return true;
  }
  return false;
};
