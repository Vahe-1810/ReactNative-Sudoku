import { EXAMPLES } from "../constants/common";
import { random } from "../utils/randomNum";
import { forceWin } from "./forceWin";

export const generateRandomBoard = (setBoard, difficult) => {
  const solvedBoard = forceWin(EXAMPLES[random(EXAMPLES.length)]);
  const playerBoard = createPlayerBoard(solvedBoard, difficult);
  setBoard(playerBoard);
};

const createPlayerBoard = (solvedBoard, difficult) => {
  const emptyCells = difficult;

  const playerBoard = JSON.parse(JSON.stringify(solvedBoard));
  const cells = Array.from({ length: 81 }, (_, index) => index);
  shuffleArray(cells);

  for (let i = 0; i < emptyCells; i++) {
    const cell = cells[i];
    const row = Math.floor(cell / 9);
    const col = cell % 9;
    playerBoard[row][col] = 0;
  }

  return playerBoard;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
