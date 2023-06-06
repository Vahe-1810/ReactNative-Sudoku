export const checkDuplicates = (board) => {
  const newDuplicates = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      const value = board[row][col];

      if (value !== 0) {
        const rowDuplicates = board[row].filter(
          (num, index) => num === value && index !== col
        );

        const colDuplicates = board
          .map((r) => r[col])
          .filter((num, index) => num === value && index !== row);

        const blockRow =
          Math.floor(row / Math.sqrt(board.length)) * Math.sqrt(board.length);
        const blockCol =
          Math.floor(col / Math.sqrt(board.length)) * Math.sqrt(board.length);
        const blockDuplicates = [];

        for (let r = blockRow; r < blockRow + Math.sqrt(board.length); r++) {
          for (let c = blockCol; c < blockCol + Math.sqrt(board.length); c++) {
            if (r !== row && c !== col && board[r][c] === value) {
              blockDuplicates.push({ row: r, col: c });
            }
          }
        }

        if (
          rowDuplicates.length > 0 ||
          colDuplicates.length > 0 ||
          blockDuplicates.length > 0
        ) {
          newDuplicates.push({ row, col });
        }
      }
    }
  }

  return newDuplicates;
};

export const checkValidate = (num, pos, board) => {
  const size = board.length;
  const boxSize = Math.sqrt(board.length);
  const [r, c] = pos;

  for (let i = 0; i < size; i++) {
    if (board[i][c] === num && i !== r) {
      return false;
    }
  }

  for (let i = 0; i < size; i++) {
    if (board[r][i] === num && i !== c) {
      return false;
    }
  }

  const boxRow = Math.floor(r / boxSize) * boxSize;
  const boxCol = Math.floor(c / boxSize) * boxSize;

  for (let i = boxRow; i < boxRow + boxSize; i++) {
    for (let j = boxCol; j < boxCol + boxSize; j++) {
      if (board[i][j] === num && i !== r && j !== c) {
        return false;
      }
    }
  }

  return true;
};
