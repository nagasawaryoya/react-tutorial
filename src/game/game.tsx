import React, { useCallback, useState } from 'react';
import { Board } from '../board/board'
import { SquareTypeArray } from '../square/square';
import { judgement } from '../judgment';
import './game.css';

type State = {
  squares: SquareTypeArray,
  xIsNext: boolean
}

export const Game = () => {
  const [state, setState] = useState<State>({
    squares: Array(9).fill(null),
    xIsNext: true,
  });

  // const handleClick = useCallback((i: number) => {
  //   const squares = [...state.squares];
  //   squares[i] = state.xIsNext ? 'X' : 'O';
  //   setState({
  //     squares: squares,
  //     xIsNext: !state.xIsNext,
  //   });
  // }, [state.squares, state.xIsNext])
  const handleClick = (i: number): void => {
    if (judgement(state.squares) || state.squares[i]) return;

    const squares = [...state.squares];
    squares[i] = state.xIsNext ? 'X' : 'O';
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.squares}
          xIsNext={state.xIsNext}
          onClick={ (i: number) => handleClick(i) }
        />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

Game.displayName = 'Game';