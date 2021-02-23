import React, { useState } from 'react';
import { Board } from '../board/board'
import { SquareTypeArray } from '../square/square';
import { calculateWinner } from '../calculate/winner';
import { calculatePosition } from '../calculate/position';
import './game.css';

type Squares = {
  squares: SquareTypeArray,
  turn?: number,
}

type State = {
  history: Squares[],
  xIsNext: boolean,
  stepNumber: number,
}

export const Game = () => {
  const [state, setState] = useState<State>({
    history: [{
      squares: Array(9).fill(null),
    }],
    xIsNext: true,
    stepNumber: 0
  });

  const handleClick = (i: number): void => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = state.xIsNext ? 'X' : 'O';

    setState({
      history: history.concat([{
        squares: squares,
        turn: i,
      }]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length,
    });
  }

  const jumpTo = (step: number): void => (
    setState({
      history: history,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  );

  const history = state.history;
  const current = history[state.stepNumber];
  const status = calculateWinner(current.squares) ?? `Next player: ${state.xIsNext ? 'X' : 'O'}`;
  const position = calculatePosition(current.turn);

  const moves = history.map((_, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={ move }>
        <button onClick={ () => jumpTo(move) }>{ desc }</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={ current.squares }
          onClick={ (i: number) => handleClick(i) }
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <div>col: { position.col }</div>
        <div>row: { position.row }</div>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

Game.displayName = 'Game';