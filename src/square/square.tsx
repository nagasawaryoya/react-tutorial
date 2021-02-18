import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './square.css';

export type SquareType = 'X' | 'O' | null;

export type SquareTypeArray = SquareType[];

type Props = {
  value: SquareType,
  onClick: () => void
}

export const Square: FC<Props> = ({ ...props }) => (
  <button className="square" onClick={ props.onClick }>
    { props.value }
  </button>
);

Square.displayName = 'Square';

Square.defaultProps = {
  value: null
};

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
};