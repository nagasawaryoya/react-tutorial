import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { History } from '../game/game';
import { Square } from '../square/square'
import './board.css';

type Props = {
  value: History,
  onClick: (i: number) => void
}

export const Board: FC<Props> = ({ ...props }) => {
  const renderSquare = (i: number) => (
    <Square
      value={ props.value.squares[i] }
      current={i === props.value.turn}
      onClick={ () => props.onClick(i) }
    />
  );

  return (
    <div>
      <div className="board-row">
        { renderSquare(0) }
        { renderSquare(1) }
        { renderSquare(2) }
      </div>
      <div className="board-row">
        { renderSquare(3) }
        { renderSquare(4) }
        { renderSquare(5) }
      </div>
      <div className="board-row">
        { renderSquare(6) }
        { renderSquare(7) }
        { renderSquare(8) }
      </div>
    </div>
  );
}

Board.displayName = 'Board';

Board.defaultProps = {
  value: {
    squares: Array(9).fill(null),
    turn: undefined,
  }
};

// Square.propTypes = {
//   value: {
//     squares: PropTypes.arrayOf(PropTypes.oneOf(['X', 'O', null])),
//     turn: PropTypes.number
//   }
// };
