import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './square.css';

export type SquareType = 'X' | 'O' | null;

export type SquareTypeArray = SquareType[];

type Props = {
  value: SquareType,
  current: boolean,
  onClick: () => void
}

export const Square: FC<Props> = ({ ...props }) => {
  let className = 'square';
  if (props.current) {
    className += ' current';
  }

  return (
    <button className={className} onClick={ props.onClick }>
      { props.value }
    </button>
  );
};

Square.displayName = 'Square';

Square.defaultProps = {
  value: null,
  current: false,
};

Square.propTypes = {
  value: PropTypes.oneOf(['X', 'O', null]),
  current: PropTypes.bool.isRequired,
};