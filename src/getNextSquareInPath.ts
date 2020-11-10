import Move from "./Move";

const getNextSquareInPath = (
  params: Readonly<{
    mapSize: number;
    currentSquareIdx: number;
    nextMove: Move;
  }>
): number => {
  const { nextMove, mapSize, currentSquareIdx } = params;

  switch (nextMove) {
    case Move.R:
      return currentSquareIdx + 1;
    case Move.L:
      return currentSquareIdx - 1;
    case Move.D:
      return currentSquareIdx + mapSize;
    case Move.U:
      return currentSquareIdx - mapSize;
  }
};

export default getNextSquareInPath;
