import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { SQUARE_TYPE } from '../enums/square-type';
import './square.css';

export type SquareType = SQUARE_TYPE.X | SQUARE_TYPE.O | null;
export type SquareTypeArray = SquareType[];

type Props = {
  value: SquareType;
  current: boolean;
  victory: boolean;
  onClick: () => void;
};

export const Square: FC<Props> = ({ ...props }) => {
  let className = 'square';
  if (props.current) {
    className += ' current';
  }
  if (props.victory) {
    className += ' victory';
  }

  return (
    <button className={className} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

Square.displayName = 'Square';

Square.defaultProps = {
  value: null,
  current: false,
  victory: false,
};

Square.propTypes = {
  value: PropTypes.oneOf([SQUARE_TYPE.X, SQUARE_TYPE.O, null]),
  current: PropTypes.bool.isRequired,
  victory: PropTypes.bool.isRequired,
};
