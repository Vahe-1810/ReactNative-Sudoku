export const positionsMap = (board) => {
  const positions = new Map();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const col = board[i][j];
      if (col !== 0) {
        positions.set(`${i},${j}`, col);
      }
    }
  }
  return positions;
};
