type Position = {
  col: number;
  row: number;
}

export const calculatePosition = (turn?: number): Position => {
  if (turn === undefined) {
    return {
      col: 0,
      row: 0,
    }
  };

  const modulo = (turn + 1) % 3;
  const division = Math.floor((turn + 1) / 3);

  return modulo === 0
    ? {
      col: 3,
      row: division,
    }
    : {
      col: modulo,
      row: division + 1,
    }
};