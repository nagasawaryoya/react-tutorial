import React, { useMemo, useState } from 'react';
import { Board } from '../board/board';
import { SquareTypeArray } from '../square/square';
import { calculateWinner } from '../../calculate/winner';
import { calculatePosition } from '../../calculate/position';
import { SQUARE_TYPE } from '../../enums/square-type';
import { SORT_TYPE } from '../../enums/sort-type';
import './game.css';
import { MSG_GO_TO_START, MSG_GO_TO_END } from '../../consts/messages';

export type History = {
  squares: SquareTypeArray;
  turn?: number;
};

type State = {
  history: History[];
  xIsNext: boolean;
  stepNumber: number;
};

type SortType = SORT_TYPE.ASC | SORT_TYPE.DESC;

export const Game = () => {
  const [state, setState] = useState<State>({
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
  });
  const [history, setHistory] = useState<History[]>([...state.history]);
  const [moves, setMoves] = useState<JSX.Element[]>([]);
  const [toggle, setToggle] = useState<SortType>(SORT_TYPE.DESC);

  const handleClick = (i: number): void => {
    const stateHistory = state.history.slice(0, state.stepNumber + 1);
    const current = stateHistory[history.length - 1];
    const squares = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = state.xIsNext ? SQUARE_TYPE.X : SQUARE_TYPE.O;
    setState({
      history: history.concat([
        {
          squares: squares,
          turn: i,
        },
      ]),
      xIsNext: !state.xIsNext,
      stepNumber: history.length,
    });
    setHistory(
      history.concat({
        squares: squares,
        turn: i,
      }),
    );
  };

  const toggleMoves = () => {
    setToggle(toggle === SORT_TYPE.DESC ? SORT_TYPE.ASC : SORT_TYPE.DESC);
    setHistory([...history].reverse());
  };

  const [current, status, position, victory] = useMemo(() => {
    const jumpTo = (step: number): void =>
      setState({
        history: history,
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    const historyMessage = (history: History[], step: number) => {
      if (toggle === SORT_TYPE.DESC) {
        return step ? 'Go to move #' + step : MSG_GO_TO_START;
      }
      return step ? 'Go to move #' + (history.length - step) : MSG_GO_TO_END;
    };

    const stateHistory = state.history;
    const current = stateHistory[state.stepNumber];
    const position = calculatePosition(current.turn);
    const { status, victory } = calculateWinner(current.squares) ?? {
      status: `Next player: ${state.xIsNext ? SQUARE_TYPE.X : SQUARE_TYPE.O}`,
      victory: [],
    };

    setMoves(
      history.map((_, move) => (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{historyMessage(history, move)}</button>
        </li>
      )),
    );
    return [current, status, position, victory];
  }, [state.history, state.stepNumber, state.xIsNext, history, toggle]);

  return (
    <div className="game">
      <div className="game-board">
        <Board value={current} victory={victory} onClick={(i: number) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div>col: {position.col}</div>
        <div>row: {position.row}</div>
        <button onClick={() => toggleMoves()}>toggle</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

Game.displayName = 'Game';
