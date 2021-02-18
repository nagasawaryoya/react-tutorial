import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Square, SquareTypeArray } from '../square/square'
import { judgement } from '../judgment';
import './board.css';

type Props = {
  squares: SquareTypeArray,
  xIsNext: boolean,
  onClick: (i: number) => void
}

export const Board: FC<Props> = ({ ...props }) => {
  console.log('Board');
  const renderSquare = (i: number) => (
    <Square
      value={ props.squares[i] }
      onClick={ () => props.onClick(i) }
    />
  );

  const status = judgement(props.squares) ?? `Next player: ${props.xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
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
  squares: Array(9).fill(null),
  xIsNext: true
};

Board.propTypes = {
  // squares: PropTypes.arrayOf(
  //   PropTypes.oneOf(['X', 'O', null])
  // ),
  xIsNext: PropTypes.bool.isRequired
};