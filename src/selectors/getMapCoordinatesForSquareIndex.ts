import { MapCoordinate } from "../api/getPathHome";

const getMapCoordinatesForSquareIndex = (squareSize: number) => (
  squareIdx: number
): MapCoordinate => {
  const x = squareIdx % squareSize;
  const y = Math.floor(squareIdx / squareSize);
  return { x, y };
};

export default getMapCoordinatesForSquareIndex;
