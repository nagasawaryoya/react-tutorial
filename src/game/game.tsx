import React, { useMemo, useState } from 'react';
import { Board } from '../board/board'
import { SquareTypeArray } from '../square/square';
import { calculateWinner } from '../calculate/winner';
import { calculatePosition } from '../calculate/position';
import './game.css';

export type History = {
  squares: SquareTypeArray,
  turn?: number,
}

type State = {
  history: History[],
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
  const [history, setHistory] = useState<History[]>([...state.history]);
  const [moves, setMoves] = useState<JSX.Element[]>([]);

  const handleClick = (i: number): void => {
    const stateHistory = state.history.slice(0, state.stepNumber + 1);
    const current = stateHistory[history.length - 1];
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
    setHistory(
      history.concat({
      squares: squares,
      turn: i,
    }))
  }

  const jumpTo = (step: number): void => (
    setState({
      history: history,
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  );

  const toggleMoves = () => setHistory([...history].reverse());

  const [current, status, position] = useMemo(() => {
    const stateHistory = state.history;
    const current = stateHistory[state.stepNumber];
    const status = calculateWinner(current.squares) ?? `Next player: ${state.xIsNext ? 'X' : 'O'}`;
    const position = calculatePosition(current.turn);
    setMoves(
      history.map((_, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
          <li key={ move }>
            <button onClick={ () => jumpTo(move) }>{ desc }</button>
          </li>
        );
      })
    );
    return [current, status, position];
  }, [state, history]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          value={ current }
          onClick={ (i: number) => handleClick(i) }
        />
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <div>col: { position.col }</div>
        <div>row: { position.row }</div>
        <button onClick={ () => toggleMoves() }>toggle</button>
        <ol>{ moves }</ol>
      </div>
    </div>
  );
}

Game.displayName = 'Game';