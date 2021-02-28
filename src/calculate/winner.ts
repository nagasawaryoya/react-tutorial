import { SquareTypeArray } from '../square/square';

type Winner = {
  status: string;
  victory: number[];
};

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const calculateWinner = (squares: SquareTypeArray): Winner | null => {
  for (let i = 0; i < LINES.length; i++) {
    const [a, b, c] = LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        status: `Winner: ${squares[a]}`,
        victory: [a, b, c],
      };
    }
  }
  return null;
};
