import { checkValidate } from "./checkDupls";
import { checkWin } from "./checkWin";

const mtx = [
  [4, 0, 1, 0],
  [0, 2, 0, 0],
  [0, 0, 3, 0],
  [0, 0, 2, 0],
];
export const forceWin = (board = mtx) => {
  const size = board.length;

  const findEmpty = (board) => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board.length; c++) {
        const cube = board[r][c];
        if (cube === 0) {
          return [r, c];
        }
      }
    }
    return null;
  };

  const solve = () => {
    const currPos = findEmpty(board);

    if (currPos === null) {
      return true;
    }
    for (let i = 1; i < size + 1; i++) {
      const isValid = checkValidate(i, currPos, board);
      if (isValid) {
        const [x, y] = currPos;
        board[x][y] = i;

        if (solve()) {
          return true;
        }

        board[x][y] = 0;
      }
    }

    return false;
  };

  solve();
  return board;
};
