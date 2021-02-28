import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { History } from '../game/game';
import { Square } from '../square/square';
import './board.css';

type Props = {
  value: History;
  victory: number[];
  onClick: (i: number) => void;
};

export const Board: FC<Props> = ({ ...props }) => {
  const renderSquare = (i: number) => (
    <Square
      key={i}
      value={props.value.squares[i]}
      current={i === props.value.turn}
      victory={props.victory.some((v) => i === v)}
      onClick={() => props.onClick(i)}
    />
  );

  const renderRow = ({ row, i }: { row: JSX.Element[]; i: number }) => (
    <div key={i} className="board-row">
      {row}
    </div>
  );

  const createBoard = () => {
    const boards: JSX.Element[] = [];
    const row: JSX.Element[] = [];
    for (let i = 0; i < 9; i++) {
      row.push(renderSquare(i));
      if ((i + 1) % 3 === 0) {
        boards.push(renderRow({ row: [...row], i: i }));
        row.splice(0);
      }
    }
    return boards;
  };

  return <div>{createBoard()}</div>;
};

Board.displayName = 'Board';

Board.defaultProps = {
  value: {
    squares: Array(9).fill(null),
    turn: undefined,
  },
};

// Square.propTypes = {
//   value: {
//     squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])),
//     turn: PropTypes.number
//   }
// };
